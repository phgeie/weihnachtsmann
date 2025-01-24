package com.codetest.CRUD_Spring.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class XmasWish {
    @Id
    private Integer id;

    private String wish;

    private String name;

    private Integer status;
}