const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls



// var data = {
//     rows: [],
//     photos: {}
// }

var adminOpenDesignerChoiceSubmit = false;

const backstageAdmin = "1234"
var numReceivedDesignerChoices = 2;
var data = {
    "rows": [
        [
            "Marcus Duquette",
            "1",
            "Second Year",
            "6'5\"",
            "12",
            "he him his",
            "https://farm2.staticflickr.com/1972/31795935398_29e85a6e3c.jpg",
            "https://farm2.staticflickr.com/1972/31795935398_29e85a6e3c.jpg"
        ],
        [
            "Dina Zaher ",
            "2",
            "First Year",
            "5'10\"",
            "10",
            "she, hers, her",
            "https://farm5.staticflickr.com/4814/43891028870_c2e439d528.jpg",
            "https://farm5.staticflickr.com/4814/43891028870_c2e439d528.jpg"
        ],
        [
            "Kathleen Cui",
            "3",
            "First Year",
            "5'8\"",
            "8",
            "she/her/hers",
            "https://farm5.staticflickr.com/4864/45658070062_a569d2fe45.jpg",
            "https://farm5.staticflickr.com/4864/45658070062_a569d2fe45.jpg"
        ],
        [
            "Louis Levin",
            "4",
            "First Year",
            "6'2\"",
            "12 US",
            "he/him/his",
            "https://farm5.staticflickr.com/4900/43891092900_c2b5c1d41a.jpg",
            "https://farm5.staticflickr.com/4900/43891092900_c2b5c1d41a.jpg"
        ],
        [
            "Murphy Shorb",
            "5",
            "First Year",
            "5'2\"",
            "6.5/7",
            "she/hers",
            "https://farm5.staticflickr.com/4910/45658087962_1674c77ba8.jpg",
            "https://farm5.staticflickr.com/4910/45658087962_1674c77ba8.jpg"
        ],
        [
            "Casey Breen",
            "6",
            "Second Year",
            "5'2\"",
            "7.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Ella Parker",
            "7",
            "First Year",
            "6'0\"",
            "10.5",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Lodovico De Boni",
            "8",
            "Second Year",
            "5 10",
            "11",
            "he/him",
            "",
            ""
        ],
        [
            "Zavior Phillips",
            "9",
            "Second Year",
            "6'0\"",
            "12",
            "he/him/his",
            "",
            ""
        ],
        [
            "Emily Zhu",
            "10",
            "Second Year",
            "5'5\"",
            "8",
            "she/her",
            "",
            ""
        ],
        [
            "Mario Peracchi  ",
            "11",
            "Second Year",
            "5'8''",
            "8.5",
            "he him",
            "",
            ""
        ],
        [
            "Estelle Ndukwe",
            "12",
            "First Year",
            "5'8",
            "8 1/2",
            "Miss",
            "",
            ""
        ],
        [
            "Alexia Bacigalupi",
            "13",
            "Third Year",
            "5'7",
            "8",
            "her",
            "",
            ""
        ],
        [
            "Stephanie Davis",
            "14",
            "First Year",
            "6'0",
            "11",
            "she her hers",
            "",
            ""
        ],
        [
            "Olivia De Keyser",
            "15",
            "Fourth Year",
            "6'",
            "10",
            "she/her",
            "",
            ""
        ],
        [
            "Rachel Hu",
            "16",
            "First Year",
            "5'7''",
            "7",
            "she, her",
            "",
            ""
        ],
        [
            "Roslyn Rios",
            "17",
            "Second Year",
            "5'2\"",
            "9 Women's",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Greer Baxter",
            "18",
            "Second Year",
            "5'8\"",
            "8",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Isabel Suner",
            "19",
            "Second Year",
            "5'4\"",
            "7 Women's",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Alessandro",
            "20",
            "First Year",
            "5 11",
            "42",
            "He Him His",
            "",
            ""
        ],
        [
            "Estefania Navarro",
            "21",
            "Second Year",
            "5'8",
            "7",
            "she her hers ",
            "",
            ""
        ],
        [
            "Gautami Galpalli",
            "22",
            "Fourth Year",
            "5'5\"",
            "7.5",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Sophie Desch",
            "23",
            "Third Year",
            "5'6",
            "7.5",
            "she/her",
            "",
            ""
        ],
        [
            "Tara Aggarwal",
            "24",
            "First Year",
            "5'4",
            "7",
            "she, her",
            "",
            ""
        ],
        [
            "Shaili Datta",
            "25",
            "Fourth Year",
            "5'4\"",
            "7.5",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Rylen Sigman",
            "26",
            "Second Year",
            "5'7\"",
            "9",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Julia Fischer",
            "27",
            "First Year",
            "5 ft 5 in",
            "6.5",
            "He/she/hers",
            "",
            ""
        ],
        [
            "Kayla Jessup",
            "28",
            "First Year",
            "5 ft. 11.5 in.",
            "10",
            "she/her",
            "",
            ""
        ],
        [
            "Kaela Bynoe",
            "29",
            "Third Year",
            "5'9.5\"",
            "10",
            "she her hers",
            "",
            ""
        ],
        [
            "Marie Harwell",
            "30",
            "First Year",
            "5 foot 8",
            "8.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Melis Ozkan",
            "31",
            "Second Year",
            "5'7",
            "8 1/2",
            "She, her",
            "",
            ""
        ],
        [
            "Delaney Gold-Diamond",
            "32",
            "Fourth Year",
            "5 foot 1 inch",
            "6.5",
            "her/hers/she",
            "",
            ""
        ],
        [
            "Sarah Saltiel",
            "33",
            "Third Year",
            "5'4",
            "7",
            "she/they",
            "",
            ""
        ],
        [
            "Radhika Ramakrishnan",
            "34",
            "Fourth Year",
            "5 feet 5 inches",
            "6.5",
            "she/her",
            "",
            ""
        ],
        [
            "Fendy Gao",
            "35",
            "First Year",
            "5 ft 5 inches",
            "6",
            "she/her",
            "",
            ""
        ],
        [
            "Emma Preston",
            "36",
            "Fourth Year",
            "five feet two inches",
            "8",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Rachel Cheng",
            "37",
            "Second Year",
            "5 ft 7 in",
            "7",
            "She/Her",
            "",
            ""
        ],
        [
            "Rosie Albrecht",
            "38",
            "Second Year",
            "5'4\"",
            "8",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Jennifer Zeng",
            "39",
            "Third Year",
            "5'3''",
            "6",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Olamide Ogunbambo",
            "41",
            "Third Year",
            "5ft5",
            "9.5",
            "she/hers/princess",
            "",
            ""
        ],
        [
            "Noa Levin",
            "42",
            "First Year",
            "5'6\"",
            "8.5",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Kara Hairston",
            "49",
            "Third Year",
            "5 ft 5 in",
            "8",
            "she/hers",
            "",
            ""
        ],
        [
            "Maddie Anderson",
            "43",
            "Fourth Year",
            "5 feet 5 inches",
            "8",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Marilyn Gund",
            "44",
            "Fourth Year",
            "5'6\"",
            "8.5",
            "she hers her",
            "",
            ""
        ],
        [
            "Michelle Hahn",
            "45",
            "Second Year",
            "5'5\"",
            "7.5",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Catherine Zhang",
            "46",
            "Fourth Year",
            "5'3",
            "7",
            "her/hers/she",
            "",
            ""
        ],
        [
            "Joshua Lam",
            "47",
            "Fourth Year",
            "6'0",
            "9.5",
            "he",
            "",
            ""
        ],
        [
            "Isabel Getz",
            "48",
            "First Year",
            "5'7",
            "7-7.5",
            "She her hers",
            "",
            ""
        ],
        [
            "Kara Hairston",
            "49",
            "Third Year",
            "5 ft 5 in",
            "8",
            "she/hers",
            "",
            ""
        ],
        [
            "Freda Hu",
            "50",
            "Third Year",
            "5'3",
            "6.5-7",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Yael Caplan",
            "51",
            "Fourth Year",
            "5'5\"",
            "6.5",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Taz Urnov",
            "52",
            "Third Year",
            "5'8\"",
            "8.5/9",
            "she/her or they/them",
            "",
            ""
        ],
        [
            "Alexandria Ma",
            "53",
            "First Year",
            "5'4''",
            "7/7.5",
            "She Her Hers",
            "",
            ""
        ],
        [
            "Natalie Crawford",
            "54",
            "Third Year",
            "5'7",
            "7.5/8",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Emily Rao",
            "55",
            "Fourth Year",
            "5'6''",
            "8/8.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Christy Cheng",
            "56",
            "Second Year",
            "5'5",
            "7.5",
            "She, hers",
            "",
            ""
        ],
        [
            "Tiffany Vaughan",
            "57",
            "First Year",
            "5' 8''",
            "8",
            "she",
            "",
            ""
        ],
        [
            "Valerie Ding",
            "58",
            "Fourth Year",
            "5 ft 7 in",
            "7",
            "she her hers",
            "",
            ""
        ],
        [
            "Khephren Chambers",
            "59",
            "Third Year",
            "6'3\"",
            "12",
            "he/him",
            "",
            ""
        ],
        [
            "Elizabeth Smith",
            "60",
            "Fourth Year",
            "5'8\"",
            "9",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Andrew Chuang",
            "61",
            "Fourth Year",
            "5'10\"",
            "9.5",
            "He/him/his",
            "",
            ""
        ],
        [
            "Tahnee Muller",
            "62",
            "Third Year",
            "5'8",
            "8",
            "she/her",
            "",
            ""
        ],
        [
            "Kevin Sokal",
            "63",
            "Fourth Year",
            "5'11''",
            "11",
            "he/him/his",
            "",
            ""
        ],
        [
            "Alex Theodosakis",
            "64",
            "Fourth Year",
            "5'8\"",
            "8.5",
            "She, Her, Hers",
            "",
            ""
        ],
        [
            "Sydney Mathis",
            "65",
            "Third Year",
            "5'3\"",
            "7",
            "She",
            "",
            ""
        ],
        [
            "Cynthia Aguilar Paredes",
            "66",
            "Third Year",
            "5'7\"",
            "10",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Michelle Ling",
            "67",
            "Fourth Year",
            "5'8",
            "8.5",
            "she, her, hers",
            "",
            ""
        ],
        [
            "perri WIlson",
            "68",
            "First Year",
            "5'3",
            "7.5",
            "she",
            "",
            ""
        ],
        [
            "Isa Alvarez ",
            "69",
            "Third Year",
            "5'3",
            "6.5",
            "she, her ,hers ",
            "",
            ""
        ],
        [
            "Cosmo Albrecht",
            "70",
            "Fourth Year",
            "6'1\" ",
            "11 (wide, preferably)",
            "he/him",
            "",
            ""
        ],
        [
            "Petra Byl",
            "71",
            "Fourth Year",
            "5'11''",
            "10",
            "she",
            "",
            ""
        ],
        [
            "Elle De La Cancela",
            "72",
            "Fourth Year",
            "5 ft 8",
            "9.5 womens",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Talia Pearl",
            "73",
            "Fourth Year",
            "5'6\"",
            "7.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Julia Holzman",
            "74",
            "First Year",
            "5'7",
            "9",
            "she/her/hers",
            "",
            ""
        ],
        [
            "connor fieweger",
            "75",
            "Third Year",
            "6'",
            "12ish",
            "he his him",
            "",
            ""
        ],
        [
            "Natalia Rodriguez",
            "76",
            "First Year",
            "5'9\"",
            "10.5",
            "she/her",
            "",
            ""
        ],
        [
            "Naomy Grand'Pierre",
            "77",
            "Third Year",
            "5'9",
            "9",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Laura Turner",
            "78",
            "Fourth Year",
            "5'6\"",
            "6-6.5",
            "she/her",
            "",
            ""
        ],
        [
            "Antonia Theodosakis",
            "79",
            "Second Year",
            "5'6''",
            "6",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Irena Feng",
            "80",
            "Third Year",
            "5'6\"",
            "6.5",
            "she her hers",
            "",
            ""
        ],
        [
            "David Yunis",
            "81",
            "Third Year",
            "5'11\"?",
            "12",
            "he/him/his",
            "",
            ""
        ],
        [
            "Tina Tan",
            "82",
            "Third Year",
            "5'4\"",
            "8.5 F",
            "she/her",
            "",
            ""
        ],
        [
            "Faith",
            "83",
            "Third Year",
            "5'7.5''",
            "7.5",
            "she,her,hers",
            "",
            ""
        ],
        [
            "Lucas Penido",
            "84",
            "Third Year",
            "5'8",
            "9",
            "He/Him/His",
            "",
            ""
        ],
        [
            "Rosalind Joyce",
            "85",
            "Second Year",
            "5'9\"",
            "9.5",
            "She/Her/Hers",
            "",
            ""
        ],
        [
            "Kate Clement",
            "86",
            "Second Year",
            "5ft, 5in",
            "8.5",
            "she/her",
            "",
            ""
        ],
        [
            "Anna Bakwin",
            "87",
            "Second Year",
            "5'3\"-5'4\"",
            "7.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Andrea Li",
            "88",
            "Second Year",
            "5'11\"",
            "9",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Caleb Lugo",
            "89",
            "Fourth Year",
            "5'10.5",
            "10",
            "He/him/his",
            "",
            ""
        ],
        [
            "claire drigotas",
            "90",
            "Third Year",
            "5ft 8",
            "8",
            "she",
            "",
            ""
        ],
        [
            "Rachel Alexander ",
            "91",
            "Second Year",
            "5ft 8in ",
            "10",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Belle Chen",
            "92",
            "Second Year",
            "5'7",
            "8",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Lizzie Hunpatin",
            "93",
            "Third Year",
            "5'7''",
            "10",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Dhruv Maheshwari",
            "94",
            "First Year",
            "6 feet 1 inch i think",
            "12",
            "he him his",
            "",
            ""
        ],
        [
            "Brandon Huang",
            "95",
            "First Year",
            "5 9",
            "41.5",
            "Him His He",
            "",
            ""
        ],
        [
            "Evan Marquardt",
            "96",
            "First Year",
            "5'11\"",
            "12",
            "He/Him",
            "",
            ""
        ],
        [
            "Shreya Sood",
            "97",
            "Fourth Year",
            "5' 3\"",
            "7.5",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Harini Shah",
            "98",
            "Second Year",
            "5 ft 1 inch",
            "6.5/7",
            "She, her, hers",
            "",
            ""
        ],
        [
            "Matthew Martinez",
            "99",
            "First Year",
            "6'0",
            "12",
            "He, Him, His",
            "",
            ""
        ],
        [
            "Yamini Nambimadom",
            "100",
            "Second Year",
            "5'1\"",
            "Female 6",
            "She/Her/Hers",
            "",
            ""
        ],
        [
            "Priyanka Farrell",
            "101",
            "Fourth Year",
            "5 foot 8 inches",
            "9.5",
            "she/ hers/ her",
            "",
            ""
        ],
        [
            "Lily Grantcharova",
            "102",
            "First Year",
            "5 ft 5 in",
            "8.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "gabrielle bogert",
            "103",
            "Second Year",
            "5'9\"",
            "8.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Joseph Wiltzer",
            "104",
            "Second Year",
            "6'4",
            "11.5",
            "He/Him/His",
            "",
            ""
        ],
        [
            "Kajol Char",
            "105",
            "Third Year",
            "5 ft 5 in",
            "8",
            "she",
            "",
            ""
        ],
        [
            "Zoey Twyford",
            "106",
            "Fourth Year",
            "5'7",
            "8/15-9",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Tiffany Wu",
            "107",
            "First Year",
            "5'6\"",
            "7.5",
            "She, her, hers",
            "",
            ""
        ],
        [
            "Sarah Wasik ",
            "108",
            "Third Year",
            "5' 8\" ",
            "10",
            "she her hers",
            "",
            ""
        ],
        [
            "Elly McCarthy",
            "109",
            "Third Year",
            "5'4.5''",
            "8",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Martina Lentino",
            "110",
            "Third Year",
            "5'9\"",
            "8 1/2",
            "she",
            "",
            ""
        ],
        [
            "Elizabeth Ortiz",
            "111",
            "Third Year",
            "5.6",
            "8",
            "Her/hers",
            "",
            ""
        ],
        [
            "Chika Anikamadu",
            "112",
            "Second Year",
            "6'1\"",
            "10",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Munachiso Okebalama",
            "114",
            "Second Year",
            "5'11\"",
            "11",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Tracy Liu",
            "115",
            "First Year",
            "166 cm ",
            "7 or 6 1/2",
            "she/her",
            "",
            ""
        ],
        [
            "Hannah Jacobs-El",
            "116",
            "Fourth Year",
            "5'2\"",
            "6.5",
            "She/Her/Hers",
            "",
            ""
        ],
        [
            "Tunisia Tai",
            "117",
            "Fourth Year",
            "5'4",
            "7",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Ruby Ross",
            "118",
            "Second Year",
            "5'6''",
            "8",
            "she/her",
            "",
            ""
        ],
        [
            "Amelia Frank",
            "119",
            "Second Year",
            "5'5\"?",
            "8.5",
            "she/her",
            "",
            ""
        ],
        [
            "Radhika Upadhye",
            "120",
            "Second Year",
            "5 ft 4 in",
            "7 - 7.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Phuca Nguyen",
            "121",
            "Second Year",
            "5'6''",
            "7.5 or 8",
            "She",
            "",
            ""
        ],
        [
            "Arushi Saksena",
            "122",
            "Third Year",
            "5'5\"",
            "8",
            "she, her, hers",
            "",
            ""
        ],
        [
            "Tuyaa Montgomery",
            "123",
            "Fourth Year",
            "5'3\"",
            "6",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Kuba Sokolowski",
            "124",
            "Second Year",
            "5'9\"",
            "10 mens",
            "he/him/his",
            "",
            ""
        ],
        [
            "Jenny Lim",
            "125",
            "Third Year",
            "5'4\"",
            "7",
            "she her hers",
            "",
            ""
        ],
        [
            "Ariel Jackson",
            "126",
            "Fourth Year",
            "5'8\"",
            "7/7.5",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Hanna Pfeiffer",
            "127",
            "Third Year",
            "6 feet 0 inches",
            "10.5 or 11",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Amanda Milkovits",
            "128",
            "Second Year",
            "5 9",
            "9",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Jiazhen (Peng-Peng) Liu",
            "129",
            "Second Year",
            "5'8\"",
            "8",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Madison Jewell",
            "130",
            "Second Year",
            "5' 8\"",
            "7 1/2",
            "she her hers",
            "",
            ""
        ],
        [
            "Andrew Chang",
            "131",
            "First Year",
            "5 feet 9.5 inches",
            "10-10.5",
            "he, him, his",
            "",
            ""
        ],
        [
            "Jonathan Lim",
            "132",
            "Fourth Year",
            "5'9\"",
            "10",
            "He/him",
            "",
            ""
        ],
        [
            "Lancy Zhan",
            "133",
            "Third Year",
            "165 cm",
            "37.5",
            "She",
            "",
            ""
        ],
        [
            "Zander Cowan",
            "134",
            "Third Year",
            "6 ft 1 in",
            "12",
            "He/Him/His",
            "",
            ""
        ],
        [
            "Bethany Ko",
            "135",
            "Second Year",
            "5ft7",
            "7",
            "She",
            "",
            ""
        ],
        [
            "Audrey Scrafford",
            "136",
            "Third Year",
            "6ft ",
            "9.5",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Kanisha Williams",
            "137",
            "Fourth Year",
            "5'4\"",
            "7",
            "she/her/hers",
            "",
            ""
        ],
        [
            "Maximilian Site",
            "138",
            "Second Year",
            "6'0",
            "11.5",
            "he/him/his",
            "",
            ""
        ],
        [
            "Kira Ke",
            "139",
            "Fourth Year",
            "5'9'' ",
            "40",
            "She, her ",
            "",
            ""
        ],
        [
            "Tanya Sonthalia",
            "140",
            "Fourth Year",
            "5'4",
            "7",
            "She/her/hers",
            "",
            ""
        ],
        [
            "Elizabeth Brandon",
            "141",
            "Second Year",
            "5' 8",
            "8.5",
            "she",
            "",
            ""
        ],
        [
            "David Amano",
            "142",
            "Second Year",
            "5'11''",
            "9.5 (usually)",
            "He/him/his",
            "",
            ""
        ],
        [
            "Surabhi Somani",
            "143",
            "Third Year",
            "5 ft 5 in",
            "8? not 100% sure",
            "She her hers",
            "",
            ""
        ],
        [
            "Kenny Loke",
            "144",
            "Third Year",
            "6 ft 0",
            "Size 10",
            "he/him/they",
            "",
            ""
        ],
        [
            "Maya Baumann",
            "145",
            "Fourth Year",
            "5 foot 4 inches",
            "8 1/2",
            "she/her/her",
            "",
            ""
        ],
        [
            "Ravi Bakhai",
            "146",
            "Third Year",
            "6",
            "11",
            "he",
            "",
            ""
        ],
        [
            "Rachel Much",
            "147",
            "Third Year",
            "5'6",
            "8",
            "She/her",
            "",
            ""
        ],
        [
            "Tyler He",
            "148",
            "Third Year",
            "6'0\"",
            "11.5/12",
            "he/him/his",
            "",
            ""
        ],
        [
            "Natalie Gray",
            "150",
            "Fourth Year",
            "5'4''",
            "6-6.5",
            "she, her, hers",
            "",
            ""
        ],
        [
            "michelle zhou",
            "9255238226",
            "First Year",
            "5'7\"",
            "9",
            "she, her, hers ",
            "",
            ""
        ],
        [
            "blowey",
            "88",
            "Third Year",
            "5'7.5''",
            "7.5",
            "she,her,hers",
            "",
            ""
        ]
    ],
    "photos": {
        "page": 1,
        "pages": 1,
        "perpage": 100,
        "total": "5",
        "photo": [
            {
                "id": "45658087962",
                "owner": "144887162@N03",
                "secret": "1674c77ba8",
                "server": "4910",
                "farm": 5,
                "title": "5",
                "ispublic": 0,
                "isfriend": 1,
                "isfamily": 1
            },
            {
                "id": "43891092900",
                "owner": "144887162@N03",
                "secret": "c2b5c1d41a",
                "server": "4900",
                "farm": 5,
                "title": "4",
                "ispublic": 0,
                "isfriend": 1,
                "isfamily": 1
            },
            {
                "id": "45658070062",
                "owner": "144887162@N03",
                "secret": "a569d2fe45",
                "server": "4864",
                "farm": 5,
                "title": "3",
                "ispublic": 0,
                "isfriend": 1,
                "isfamily": 1
            },
            {
                "id": "43891028870",
                "owner": "144887162@N03",
                "secret": "c2e439d528",
                "server": "4814",
                "farm": 5,
                "title": "2",
                "ispublic": 0,
                "isfriend": 1,
                "isfamily": 1
            },
            {
                "id": "31795935398",
                "owner": "144887162@N03",
                "secret": "29e85a6e3c",
                "server": "1972",
                "farm": 2,
                "title": "1",
                "ispublic": 0,
                "isfriend": 1,
                "isfamily": 1
            }
        ]
    }
}

const numDesigners = 2;
var designerData = {
   car3cxm:
     { info: [ 'Caroline Mejia', '3', 'cxm@uchicago.edu', '630.401.5966' ],
       choices: [['1', '2', '3'],  [ '4', '5', '6' ], [ '7', '8', '9' ] ]},
   kir3kel:
     { info: [ 'Kira Leadholm', '3', 'keleadholm@uchicago.edu', '16122372425' ],
     choices: [['1', '2', '3'],  [ '4', '5', '6' ], [ '7', '8', '9' ] ]}}


var maxModels = 3;
var activate = false;


function makePictureLink(photoObj) {
    if (photoObj !== "undefined") {
        return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" +
            photoObj.secret + ".jpg"
    }
}

/*
 * Make photo link with returned photo object
 * match photo links to model information array.
 */
function formatData(dataObj) {
    var photos = dataObj["photos"].photo;
    ////console.log(photos)
    var len = dataObj.rows.length
    var i;
    for (i = 0; i < len; i++) {
        var currentRow = dataObj.rows[i];
        var thisPhoto = photos.filter(current => current["title"].trim() == currentRow[1].trim());
        var result;
        if (thisPhoto.length != 0){
            ////console.log("this photo");
           // //console.log(thisPhoto)
            //console.log(makePictureLink(thisPhoto[0]))
            result = makePictureLink(thisPhoto[0])
        } else {
            ////console.log("no photo!")
            result = ""
        }

        dataObj.rows[i].push(result)
    }
    return dataObj
}


/*
 * When the server is first started, the first response to api/hello
 * will be empty due to the asynchronous nature of this routine.
 * subsequent calls will have the filled out data.
 * TODO: put data pull on 15 second loop
 * TODO: test - after one minute of server running, all requests to this api should have data
 */

app.get('/api/hello', (req, res) => {
    //console.log("hello get request recieved")
    getDataOnConnection().then(function(result) {
        if (result !== "undefined") {
            ////console.log(result)
            //formatData(result)
            res.send(formatData(result))
        }
    });

});


app.post('/api/codeVerification', (req, res) => {
    var status;
    //console.log(backstageAdmin + " -- " + req.body.key)
    if (backstageAdmin == req.body.key)
        status = 200
    else
        status = 100
    //console.log("sending status " + status)
    res.send({status: status})
})

app.post('/api/selection', (req, res) => {

  if (activate) {
      //console.log(req.body);
      //console.log(typeof(designerData[req.body.code]))
      if (typeof(designerData[req.body.code]) == "undefined"){
        //console.log("sending error!")

        res.send("100Error: unknown code - please check that your code is correct");
      } else {
        // Check if designer choices were already received
        console.log(req.body)
        console.log(designerData[req.body.code]["choices"])
        if (designerData[req.body.code]["choices"].length == 0)
            numReceivedDesignerChoices =  numReceivedDesignerChoices + 1;
        console.log("num recieved: " + numReceivedDesignerChoices)
        designerData[req.body.code]["choices"] = req.body.choices
        maxModels = Math.max(maxModels, req.body.choices.length)
        //console.log(designerData[req.body.code]["choices"])

        res.send("200Submission successful - your selections have been accepted");
      }
  } else {

      res.send("150Model submissions have not been initiated by backstage administer");
  }
  
});

app.get('/api/activate', (req, res) => {
    //console.log("entered!")
    activate = !activate
    var message;
    if (activate)
        message = "Activation successful"
    else
        message = "Deactivation successful"
    res.send({message: message});

});

app.get('/api/generate', (req, res) => {
    console.log("generate - num recieved: " + numReceivedDesignerChoices)
    if (numDesigners != numReceivedDesignerChoices)
        res.send({message: "100Have not received submissions from all designers"})
    else {
        //console.log(designerData)
        matchModelsAndDesigners()
    }

});

function designerIteration(keys, takenModels, reverse, selectionNo) {
    if (!reverse) {
        console.log("forward")
        for (let i = 0; i < keys.length; i++) {
            let selection = designerData[keys[i]]["choices"][selectionNo]
            var modelChosen = false
            for (let j = 0; j < selection.length; j++) {
                if (takenModels.indexOf(selection[j]) == -1) {
                    modelChosen = true
                    takenModels.push(selection[j])
                    if (typeof(designerData[keys[i]]["models"]) == "undefined")
                        designerData[keys[i]]["models"] = [selection[j]];
                    else
                        designerData[keys[i]]["models"].push(selection[j]);
                    break;
                }
            }
            if (!modelChosen)
                designerData[keys[i]]["models"].push("Selections exhausted");
        }
    } else {
    // reversed run through
        for (let i = keys.length - 1; i >= 0; i--) {
            let selection = designerData[keys[i]]["choices"][selectionNo]
            var modelChosen = false
            for (let j = 0; j < selection.length; j++) {
                if (takenModels.indexOf(selection[j]) == -1) {
                    modelChosen = true
                    takenModels.push(selection[j])
                    designerData[keys[i]]["models"].push(selection[j]);
                    break;
                }
            }
            if (!modelChosen)
                designerData[keys[i]]["models"].push("Selections exhausted");
        }
    }
    return takenModels
}

function matchModelsAndDesigners() {
    // Ensure designerData is in ranked order
    var keys = Object.keys(designerData)
    console.log("keys " + keys + " len: " + keys.length)
    let takenModels = []
    // Run through model selections the maximum number of models chosen
    for (let i = 0; i < maxModels; i++) {
        console.log("taken: " + takenModels)
        var reverse;
        if (i % 2 == 0)
            reverse = false
        else
            reverse = true
        takenModels = designerIteration(keys, takenModels, reverse, i)
    }
    console.log(designerData)

}


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';


// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//     if (err) return //console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Sheets API.
//     authorize(JSON.parse(content), getSpreadsheet);
// });

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
    //console.log("authorizing")
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    //console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return //console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                //console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

//var spreadsheetInfo = {spreadsheetId: '', range: '', dataManip: false}

function getSpreadsheet(auth) {
    ////console.log("get spreadsheet callback")
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1ZctufBfnKG_D1OCOxnJsG1uc99mace4wM95uz2x4EcY',
        range: 'B1:G200',
    }, (err, res) => {
        if (err) return //console.log('The API returned an error: ' + err);
        rows = res.data.values;
        if (rows.length) {
            rows.splice(0, 1);
            data.rows = rows
            ////console.log("printing first row")
            ////console.log(rows[1]);
            // Print columns A and E, which correspond to indices 0 and 4.

        } else {
            //console.log('No data found.');
        }
    });
}

function getDesignerSpreadsheet(auth) {
    ////console.log("get spreadsheet callback")
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1f0Sedf7yeI7gBZ8u2l_27eNiIETAdKHLalQMfhSTO3g',
        range: 'A2:D25',
    }, (err, res) => {
        if (err) return //console.log('The API returned an error: ' + err);
        let result = res.data.values;
        if (result.length) {
      
            designerData = formatDesignerData(result)
            ////console.log("printing first row")
            ////console.log(designerData);
            // Print columns A and E, which correspond to indices 0 and 4.

        } else {
            //console.log('No data found.');
        }
    });
}



async function getDesignerInfo() {
    await fs.readFile('credentials.json', (err, content) => {
            if (err) return //console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), getDesignerSpreadsheet);
        });
}

function formatDesignerData(data) {
    var obj = {}
    // form designers unique code and append to array of info
    data.map(function(entry) {
        var code = entry[0].slice(0, 3) + entry[1] + entry[2].slice(0, 3);
        obj[code.toLowerCase()] = {info: entry, choices: []}
    })
    //console.log(obj)
    return obj
}



async function getDataOnConnection () {
    // Check if data object is open
    //console.log("entering data block: " + data.rows.length)
    if (data.rows.length == 0) {
        // get spreadsheet data first
        //console.log("getting spreadsheet")
        await fs.readFile('credentials.json', (err, content) => {
            if (err) return //console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            authorize(JSON.parse(content), getSpreadsheet);
        });
        //console.log("spreadsheet block done: " + data.rows[0])
        //console.log("getting photos")
        // Get photos next
       await https.get('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=b7ae4daa204a1d65aa2a0dedf0b75440&user_id=144887162%40N03&format=json&nojsoncallback=1&auth_token=72157703167858315-7525b6210a510eaa&api_sig=b1b54542ea280706d51269868a0048f0',
            (resp) => {
            //console.log("htto get has returned")
            let photoData = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                photoData += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data.photos = JSON.parse(photoData)["photos"]
                //console.log("have photo data" + photoData)

            });
            //console.log(data.rows[0])
        }).on("error", (err) => {
            //console.log("Error: " + err.message);
        });
       ////console.log(data)

       return data;
    } else {
        return data;
    }
}



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//getDesignerInfo()
app.listen(port, () => console.log(`Listening on port ${port}`));




