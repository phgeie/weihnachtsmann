package com.codetest.CRUD_Spring.camel;

import com.codetest.CRUD_Spring.model.XmasWish;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.stereotype.Component;

@Component
public class FileToApiRoute extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        // Konfiguration des Dateiscanners
        from("file:wunschzettel")
                .log("Neue Datei erkannt")
                .unmarshal().json(XmasWish.class)
                .marshal().json(JsonLibrary.Jackson)// Unmarshal JSON
                .setHeader("Content-Type", constant("application/json"))
                .to("http://localhost:8080/data/add") // URL Ihres XmasWishes-Systems
                .log("Datei erfolgreich an XmasWishes-System gesendet.");
    }
}
