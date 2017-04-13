package com.rabbit;

import com.google.gson.Gson;
import com.rabbit.controller.PerfTaskController;
import com.rabbit.service.ScenarioRunnerService;
import com.rabbitmq.tools.json.JSONReader;
import org.junit.*;
import org.junit.runner.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.io.FileReader;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
public class RunrabbitApplicationTests {

    private MockMvc mockMvc;
    private String simpleScenario;

    @Autowired
    private ScenarioRunnerService scenarioRunnerService;
    @Autowired
    private Gson gson;

    @Before
    public void setup() {
        this.mockMvc = standaloneSetup(new PerfTaskController(scenarioRunnerService, gson)).build();
        this.simpleScenario = "{\"name\": \"simple_scenario\", \"type\": \"simple\", \"params\": [{\"time-limit\": 30, \"producer-count\": 10, \"consumer-count\": 2}]}";
    }


    @Test
    public void testScenario_runner() throws Exception {
        this.mockMvc.perform(post("/submit")
                .content(this.simpleScenario))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello"));
    }
}
