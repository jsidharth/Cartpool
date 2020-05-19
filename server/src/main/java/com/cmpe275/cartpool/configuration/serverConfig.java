package com.cmpe275.cartpool.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class serverConfig {

    private static final String server = "http://localhost:3000/";

    public static String getServer() {
        return server;
    }
}
