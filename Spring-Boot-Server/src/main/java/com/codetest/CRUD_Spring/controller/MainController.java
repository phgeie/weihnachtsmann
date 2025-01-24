package com.codetest.CRUD_Spring.controller;

import com.codetest.CRUD_Spring.model.XmasWish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.codetest.CRUD_Spring.entity.*;
import com.codetest.CRUD_Spring.repository.*;
import java.util.Random;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import com.codetest.CRUD_Spring.service.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController // This means that this class is a Controller
@RequestMapping(path="/data") // This means URL's start with /data (after Application path)
public class MainController {
    @Autowired
    private XmasWishRepository xmasWishRepository;

    private int row;
    private int column;
    private Torus torus;

    @PostMapping("/add")
    public void add(@RequestBody XmasWish xmasWish){
        xmasWishRepository.save(xmasWish);
    }

}