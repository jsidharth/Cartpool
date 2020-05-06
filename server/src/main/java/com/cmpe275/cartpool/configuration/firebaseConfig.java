package com.cmpe275.cartpool.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class firebaseConfig {

    @Bean
    public DatabaseReference firebaseDatabase() {
        DatabaseReference firebase = FirebaseDatabase.getInstance().getReference();
        return firebase;
    }

    @Value("${firebase.database.url}")
    private String databaseUrl;

    public String getDatabaseUrl() {
        return databaseUrl;
    }

    @Value("${firebase.config.path}")
    private Resource configPath;

    @PostConstruct
    public void init() throws IOException {

        /**
         * https://firebase.google.com/docs/server/setup
         *
         * Create service account , download json
         */
        //System.out.println("url for stream "+ databaseUrl);
        //System.out.println("configPath : " + configPath);
        InputStream inputStream = configPath.getInputStream();
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(inputStream))
                .setDatabaseUrl(databaseUrl)
                .build();

        FirebaseApp.initializeApp(options);


    }
}
