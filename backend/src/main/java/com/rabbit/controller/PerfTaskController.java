package com.rabbit.controller;

import com.google.gson.Gson;
import com.rabbit.model.VCAP_SERVICES;
import com.rabbit.service.ScenarioRunnerService;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.perf.Scenario;
import com.rabbitmq.perf.ScenarioFactory;
import com.rabbitmq.tools.json.JSONReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Future;

/**
 * Created by Qi on 3/6/17.
 */

@RestController
public class PerfTaskController {
    private static final Logger logger = LoggerFactory.getLogger(ScenarioRunnerService.class);
    private static final ConnectionFactory connectionFactory = new ConnectionFactory();
    private static final Map<String, String> env = System.getenv();
    private static final Map<String, Scenario> resultSet = new HashMap();
    private Future runningTask;
    @Autowired
    private ScenarioRunnerService scenarioRunnerService;
    @Autowired
    private Gson gson;
    @Autowired
    private SimpMessagingTemplate webSocket;


    public PerfTaskController(ScenarioRunnerService scenarioRunnerService, Gson gson) {
        this.scenarioRunnerService = scenarioRunnerService;
        this.gson = gson;
    }

    @RequestMapping(value = "/")
    public String index() {
        return "index.html";
    }

    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    @CrossOrigin
    public String taskSubmission(@RequestBody String scenarioStr) {
        String taskID = UUID.randomUUID().toString();
        Map scenarioConfigMap = (Map) new JSONReader().read(scenarioStr);
        if (!scenarioConfigMap.containsKey("uri")) {
            fill_amqp_uri(scenarioConfigMap);
        }
        logger.info("Task " + taskID + " assigned!");
        webSocket.convertAndSend("/topic/status","Task " + taskID + "assigned!");
        try {
            Scenario scenario = ScenarioFactory.fromJSON(scenarioConfigMap, this.connectionFactory);
            this.runningTask = scenarioRunnerService.runScenario(taskID, scenario, this.resultSet);
        } catch (Exception e) {
            e.printStackTrace();
        }
        logger.info("Task " + taskID + " submitted!");
        webSocket.convertAndSend("/topic/status","Task " + taskID + " submitted!");
        return taskID;
    }

//    @MessageMapping(value = "/status")
//    @SendTo("/topic/taskstatus")
//    @CrossOrigin
//    public String taskStatus(){
//        while(!this.runningTask.isCancelled() && !this.runningTask.isDone()){}
//        return "Done";
//    }

//    @RequestMapping(value = "/result",method = RequestMethod.GET)
//    public String taskResult(@RequestParam String taskID){
//        return String.valueOf(resultSet.get(taskID).getStats().results());
//    }

    private void fill_amqp_uri(Map scenarioConfigMap) {
        logger.info("uri not defined in scenario spec,searching vcap_services...");
        try {
            VCAP_SERVICES vcap_services = gson.fromJson(env.get("VCAP_SERVICES"), VCAP_SERVICES.class);
            scenarioConfigMap.put("uri", vcap_services.getRabbits().get(0).getCredentials().getUri());
        } catch (Exception e) {
            logger.error("can't use vcap_services either, seems no rabbitmq service available");
        }
    }
}
