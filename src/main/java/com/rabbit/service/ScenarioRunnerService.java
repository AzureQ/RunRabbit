package com.rabbit.service;

/**
 * Created by Qi on 3/6/17.
 */

import com.rabbitmq.perf.Scenario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.Future;

@Service
public class ScenarioRunnerService {
    private static final Logger logger = LoggerFactory.getLogger(ScenarioRunnerService.class);

    @Autowired
    private SimpMessagingTemplate webSocket;

    @Async
    public Future<Map> runScenario(String taskID, Scenario scenario, Map resultSet) throws Exception {
        logger.info("Task " + taskID + " started!");
        scenario.run();
        logger.info("Task " + taskID + " finished!");
        logger.info("Task " + taskID + " results: " + scenario.getStats().results());
        webSocket.convertAndSend("/topic/taskstatus", scenario.getStats().results());
        resultSet.put(taskID, scenario);
        return new AsyncResult<>(resultSet);
    }
}
