package com.guessGame.Guess.The.Word.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class gameService {

    public String words[]={"father","mother","life","light"};

    Random rand= new Random();

    String random_word;
    char[] dash;

    public gameService(){
        random_word= words[rand.nextInt(words.length)];
        dash= new char[random_word.length()];
    }

    @Override
    public String toString(){

        String res= "";

        for(char i: dash){
            if(i=='\u0000')dash[i]='_';
        }
        System.out.println(random_word);

        for(int i=0;i<dash.length;i++){
            res+=dash[i];
            res+=" ";
        }

        return res;
        }

        public void fill(char word){
            for(int i=0;i<random_word.length();i++){
                if(word == random_word.charAt(i)){
                    dash[i]=random_word.charAt(i);
                }
            }
        }

    }
