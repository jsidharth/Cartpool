package com.cmpe275.cartpool.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class serverConfig {

    private static final String server = "http://locahost:3000/";

    public static String getServer() {
        return server;
    }
}
