package com.guessGame.Guess.The.Word.controller;


import com.guessGame.Guess.The.Word.service.gameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller   // Don't use RestController here.
public class gameController {

    @Autowired
    public gameService service;

    @GetMapping("/game_home")
    public String homePage(@RequestParam(value="captured_Char", required=false) String captured_Char, Model model){

        System.out.println("Word is: "+captured_Char);

        String word= service.toString();   // fetching random word.
        model.addAttribute("word",word);

        if(captured_Char!=null) {
            service.fill(captured_Char.charAt(0));
        }

        return "game-home-page";
    }
}
