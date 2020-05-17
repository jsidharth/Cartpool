package com.cmpe275.cartpool.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class serverConfig {

    @Value( "${carpool.server}" )
    private static String server;

    public static String getServer() {
        return server;
    }
}
