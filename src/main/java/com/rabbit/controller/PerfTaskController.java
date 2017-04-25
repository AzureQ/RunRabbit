package com.rabbit.controller;

import com.rabbit.service.ScenarioRunnerService;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.perf.Scenario;
import com.rabbitmq.perf.ScenarioFactory;
import com.rabbitmq.tools.json.JSONReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class PerfTaskController {
    private static final Logger logger = LoggerFactory.getLogger(ScenarioRunnerService.class);
    private static final ConnectionFactory connectionFactory = new ConnectionFactory();
    private static final Map<String, Scenario> resultSet = new HashMap<>();

    private final ScenarioRunnerService scenarioRunnerService;

    private final String AMQP_URI;

    @Autowired
    public PerfTaskController(ScenarioRunnerService scenarioRunnerService, @Qualifier("amqpURI") String AMQP_URI) {
        this.scenarioRunnerService = scenarioRunnerService;
        this.AMQP_URI = AMQP_URI;
    }

    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    @CrossOrigin
    public String taskSubmission(@RequestBody String scenarioStr) {
        String taskID = UUID.randomUUID().toString();
        Map scenarioConfigMap = (Map) new JSONReader().read(scenarioStr);
        scenarioConfigMap.put("uri", AMQP_URI);
        logger.info("Scenario Configuration" + Arrays.toString(scenarioConfigMap.entrySet().toArray()));
        logger.info("Task " + taskID + " assigned!");
        try {
            Scenario scenario = ScenarioFactory.fromJSON(scenarioConfigMap, connectionFactory);
            scenarioRunnerService.runScenario(taskID, scenario, resultSet);
        } catch (Exception e) {
            e.printStackTrace();
        }
        logger.info("Task " + taskID + " submitted!");
        return taskID;
    }
}
