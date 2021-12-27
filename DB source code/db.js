/*
* Interface implementation for European_Soccer database
* COMP 3380 - Group 13
* Instrcutor : Adam Pazdor
* Students: Abdullah AL Noman, Abhinav Sood
*/

const sqlite3 = require('sqlite3').verbose();
const readInput = require("prompt-sync");
const prompt=readInput();
let db;
let close;

main();

function main(){
    dbConnect();
}

function runProgram(){
    userPrompt();
    let input=getInput();
    let rightinput=false;
    if(checkInput1(input)){
        selectQuery(input);
    }else{
        selectQuery(continueInput(1));
    }
}

function continueInput(inputNo){
    let input;
    let rightinput=false;
        while(rightinput==false){
            input=getInput()
            if(inputNo==1){
                if(checkInput1(input)){
                rightinput=true;
                }
            }else if(inputNo=2){
                if(checkInput2(input)){
                    rightinput=true;
                }
            }else if(inputNo=3){
                   if(checkInput3(input)){
                     rightinput=true;
                }
            }
        }
        return input;
}

function dbConnect(){
db = new sqlite3.Database('./European_Soccer.db',sqlite3.OPEN_READONLY ,(err) => {
    if (err) {
        return console.error(err.message);
    }
        console.log('Connected to the European_Soccer database.');
        runProgram();

    });
    
}

function getInput(){
    let userInput=prompt("");
    return userInput;
}

function userPrompt(){
    console.log("What do you want to select?");
    console.log("1. All the contents of Table");
    console.log("2. Run general queries");
    console.log("3. Quit Program");

}

function checkState(){
    let ask=prompt("Would you like to go back to top menu? (y/n)");
    
    if(ask=='y'){
        runProgram();
    }else if(ask=='n'){
        dbClose();
    }else{
        console.log("Not a valid option");
        dbClose();
     }
    
}

function selectQuery(userInput){
    let query1="\nYou have selected";
    console.log(query1+" "+userInput)
    if(userInput==1){
        selectTable();
    }else if(userInput==2) {
        queryOptions();
    }else{
        dbClose();
    }
}

function queryOptions(){
    console.log("Which Query you want see? ");
    console.log("1. Give me names of the away teams which lost a match against home team along with the count of supporters of that Away team in decreasing order " );
    console.log("2. Give me name of the Home team which won the most matches");
    console.log("3. Give me name of the country where a league was hosted that contained maximum tie matches");
    console.log("4. Give me name of the cities in ascending order where Liverpool won a matchy as an away team ");
    console.log("5. Give me name of the matches where loosing home team had atleast 1 player with overall rating > 80 ");
    console.log("6. Give me names of the teams who played a match at Donbass Arena where the HomeTeam had a lead of 5 against the AwayTeam ");
    console.log("7. Give me all the matches with the refree name which were operated by the refree who supported HomeTeam and HomeTeam lost the match");
    console.log("8. Which match was watched by least people where the HomeTeam scored 0 goals ");
    console.log("9. Give me names of the players with Overall_rating of 69 of the team which was managed by Chris Hughton in decreasing order of their heights ");
    console.log("10. Which team has the most supporter?  ");
    let input3=getInput();
    if(checkInput3(input3)){
        printQuery(input3);
    }else{
        input3=continueInput(3);
        printQuery(input3);
    }
}

function checkInput1(userInput){
    if(userInput<1 || userInput>3 || isNaN(userInput)){
        console.log("The selected option is not valid.Try again");
        return false;
    }else{
        return true;
    }
}

function checkInput2(userInput){
    if(userInput<1 || userInput>12 || isNaN(userInput)){
        console.log("The selected option is not valid.Try again");
        return false;
    }else{
        return true;
    }
}

function checkInput3(userInput){
    if(userInput<1 || userInput>10 || isNaN(userInput)){
        console.log("The selected option is not valid.Try again");
        return false;
    }else{
        return true;
    }
}

function selectTable(){
    console.log("Which Table you want to see?");
    console.log("1. Player");
    console.log("2. Manager");
    console.log("3. Refree");
    console.log("4. Stadium");
    console.log("5. Country");
    console.log("6. League");
    console.log("7. Match");
    console.log("8. Person");
    console.log("9. Team");
    console.log("10. Operated");
    console.log("11. Watched");
    console.log("12. Support");
    let input2=getInput();
    if(checkInput2(input2)){
        printTable(input2);
    }else{
        input2=continueInput(2);
        printTable(input2);
    }
}

function printTable(table){

    if(table==1){
        dbPlayerTable();
    }else if(table==2){
        dbManagerTable();
    }else if(table==3){
        dbRefreeTable();
    }else if(table==4){
        dbStadiumTable();
    }else if(table==5){
        dbCountryTable();
    }else if(table==6){
        dbLeagueTable();
    }else if(table==7){
        dbMatchTable();
    }else if(table==8){
        dbPersonTable();
    }else if(table==9){
        dbTeamTable();
    }else if(table==10){
        dbOperatedTable();
    }else if(table==11){
        dbWatchedTable();
    }else if(table==12){
        dbSupportTable();
    }
   
}
function printQuery(query){

    if(query==1){
        dbQuery1();
    }else if(query==2){
        dbQuery2();
    }else if(query==3){
        dbQuery3();
    }else if(query==4){
        dbQuery4();
    }else if(query==5){
        dbQuery5();
    }else if(query==6){
        dbQuery6();
    }else if(query==7){
        dbQuery7();
    }else if(query==8){
        dbQuery8();
    }else if(query==9){
        dbQuery9();
    }else if(query==10){
        dbQuery10();
    }
   
}



function dbRefreeTable(){
    let sqlQuery = `SELECT * FROM Refree`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Refree_ID," - ",row.Person_ID," - ",row.Refree_name," - ",row.Birthdate," - ",row.Height," - ",row.Weight);
        });
        console.log(" Refree_ID  - Person_ID - Refree_name - Birthdate - Height - Weight ")
        checkState();
     });
    
}

function dbManagerTable(){
    let sqlQuery = `SELECT * FROM Manager`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Manager_ID," - ",row.Person_ID," - ",row.Manager_name," - ",row.Birthdate," - ",row.Height," - ",row.Weight," - ",row.Team_ID);
        });
       
        console.log(" Manager_ID  - Person_ID - Manager_name - Birthdate - Height - Weight - Team_ID ")

        checkState();
     });  
}
function dbPersonTable(){
    let sqlQuery = `SELECT * FROM Person`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Person_ID," - ",row.Person_name," - ",row.Birthdate," - ",row.Height," - ",row.Weight);
        });
       
        console.log("Person_ID - Person_name - Birthdate - Height - Weight  ")

        checkState();
     });  
}

function dbPlayerTable(){
    let sqlQuery = `SELECT * FROM Player`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Player_ID," - ",row.Person_ID," - ",row.Player_name,
        " - ",row.Birthdate," - ",row.Height,
        " - ",row.Weight," - ",row.Overall_rating," - ",row.Team_ID);
        });
        console.log(" Player_ID  - Person_ID - Player_name - Birthdate - Height - Weight - Overall_rating - Team_ID ");
        checkState();
     });     
}

function dbMatchTable(){
    let sqlQuery = `SELECT * FROM Match`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Match_ID," - ",row.League_ID," - ",row.Season,
        " - ",row.HomeTeam_ID," - ",row.AwayTeam_ID,
        " - ",row.HomeTeam_goal," - ",row.AwayTeam_goal," - ",row.Stadium_name," - ",row.Stadium_city);
        });

        console.log(" Match_ID - League_ID - Season - HomeTeam_ID - AwayTeam_ID - HomeTeam_goal - AwayTeam_goal - Stadium_name - Stadium_city  ")

        checkState();
     });     
}

function dbStadiumTable(){
    let sqlQuery = `SELECT * FROM Stadium`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Stadium_name," - ",row.Stadium_city," - ",row.Capacity," - ",row.Country_name);
        });
        console.log("Stadium_name - Stadium_city - Capacity -  Country_name ");
        checkState();
     });
     
}

function dbCountryTable(){
    let sqlQuery = `SELECT * FROM Country`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Country_ID," - ",row.Country_name);
        });
        console.log("Country_ID -  Country_name ");
        checkState();
     });  
}

function dbLeagueTable(){
    let sqlQuery = `SELECT * FROM League`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.League_ID," - ",row.League_name," - ",row.Country_name);
        });
        console.log("League_ID - League_name -  Country_name ");
        checkState();
     });
     
}

function dbTeamTable(){
    let sqlQuery = `SELECT * FROM Team`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
            console.log(row.Team_ID,"-",row.Team_name,"-",row.Team_initial,"-",row.League_ID);
        });
        console.log("Team_ID - Team_name -  Team_initial - League_ID ");
        checkState();
     }); 
}



function dbOperatedTable(){
    let sqlQuery = `SELECT * FROM Operated`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Match_ID,"-",row.Refree_ID);
        });
        console.log("Match_ID  -  Refree_ID");
        checkState();
     });   
}

function dbSupportTable(){
    let sqlQuery = `SELECT * FROM Support`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Person_ID,"-",row.Team_ID);
        });
        console.log("Person_ID - Team_ID");
        checkState();
     });   
}

function dbWatchedTable(){
    let sqlQuery = `SELECT * FROM Watched`;
    
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Match_ID,"-",row.Person_ID);
        });
        console.log("Match_ID -  Person_ID");
        checkState();
     });   
}



function dbQuery1(){
    let sqlQuery = `SELECT Team_name, count(Person_Id) as total   from Match 
                    join Team on Match.Hometeam_ID= Team.Team_ID
                    join Support on Match.AwayTeam_ID= Support.Team_ID
                    where HomeTeam_goal > AwayTeam_goal
                    group by AwayTeam_ID
                    order by total desc`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Team_name,"-", row.total);
        });
        console.log("Team_name - total ");
        checkState();
     });  
}
function dbQuery2(){
    let sqlQuery = `SELECT Team_name, count(Team_Id) as totalTeam   from Team 
                    join Match on Match.Hometeam_ID= Team.Team_ID
                    where HomeTeam_goal > AwayTeam_goal
                    group by Team_ID
                    order by count(Team_ID) desc limit 1`;

    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Team_name,"-",row.totalTeam);
        });
        console.log("Team_name - Total_Matches ");
        checkState();
     });  
}
function dbQuery3(){
    let sqlQuery = `SELECT Country_name FROM Match 
                    natural join League 
                    where HomeTeam_goal=AwayTeam_goal
                    group by League_ID
                    order by count(Match_id) desc limit 1`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Country_name);
        });
        console.log("Country_name");
        checkState();
     });  
}
function dbQuery4(){
    let sqlQuery = `SELECT Stadium_city FROM Match join Team on Match.AwayTeam_ID=Team.Team_Id
                    where AwayTeam_goal>HomeTeam_goal
                    and Team.Team_name="Liverpool" 
                    order by Stadium_city`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Stadium_city);
        });
        console.log("Stadium_city");
        checkState();
     });  
}
function dbQuery5(){
    let sqlQuery = `SELECT Match_ID, Season, HomeTeam_ID, AwayTeam_ID, HomeTeam_goal, AwayTeam_goal, Stadium_name, Stadium_city FROM Match
                    join Team on Match.HomeTeam_ID=Team.Team_ID
                    natural join player where HomeTeam_goal< AwayTeam_goal
                    and Player.Overall_rating > 80
                    group by Match_ID`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Match_ID," - ",row.Season,
                    " - ",row.HomeTeam_ID," - ",row.AwayTeam_ID,
                    " - ",row.HomeTeam_goal," - ",row.AwayTeam_goal,
                    " - ",row.Stadium_name," - ",row.Stadium_city);
        });

        console.log("Match_ID - Season,- Hometeam_ID - AwayTeam_ID,- HomeTeam_goal - AwayTeam_goal - Stadium_name - Stadium_city");
        checkState();
     });  
}
function dbQuery6(){
    let sqlQuery = `select HomeTeam.Team_name as Home_team, AwayTeam.Team_name as Away_team from Match 
                    join Team HomeTeam on Match.HomeTeam_ID = HomeTeam.Team_ID 
                    join Team AwayTeam on Match.AwayTeam_ID = AwayTeam.Team_ID
                    where HomeTeam_goal - AwayTeam_goal == 5 and Stadium_name = "Donbass Arena"`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Home_team," - ",row.Away_team);
        });
        console.log("Home_team - Away_team");
        checkState();
     });  
}

function dbQuery7(){
    let sqlQuery = `select Match_ID, League_ID, HomeTeam_ID, AwayTeam_ID, HomeTeam_goal, AwayTeam_goal, Stadium_name, Stadium_city, Refree_name 
                    from Match natural join Operated 
                    natural join Refree 
                    join Support on Refree.Person_ID = Support.Person_ID 
                    and Match.HomeTeam_ID = Support.Team_ID
                    where HomeTeam_goal < AwayTeam_goal`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
                console.log(row.Match_ID," - ",row.League_ID,
                    " - ",row.HomeTeam_ID," - ",row.AwayTeam_ID,
                    " - ",row.HomeTeam_goal," - ",row.AwayTeam_goal,
                    " - ",row.Stadium_name," - ",row.Stadium_city,
                    " - ",row. Refree_name);
        });
        console.log("Match_ID - League_ID - Hometeam_ID - AwayTeam_ID,- HomeTeam_goal - AwayTeam_goal - Stadium_name - Stadium_city - Refree_name");
        checkState();
     });  
}
function dbQuery8(){
    let sqlQuery = `select Match_ID, HomeTeam_goal, count(person_ID) as Audience from Match 
                    natural join Watched
                    where HomeTeam_goal == 0
                    group by Match_ID
                    order by Audience limit 1`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Match_ID," - ",row.HomeTeam_goal,
                    " - ",row.Audience);
        });
        console.log("Match_ID - HomeTeam_goal - Audience" );
        checkState();
     });  
}
function dbQuery9(){
    let sqlQuery = `select Player_ID, Player_name, Player.Height, Overall_rating from Player 
                    join Manager on Player.Team_ID = Manager.Team_ID
                    where Manager_name = "Chris Hughton" and Overall_rating == 69
                    order by Player.Height desc`;
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
        console.log(row.Player_ID," - ",row.Player_name," - ",row.Height," - ",row.Overall_rating );
        });
        console.log(" Player_ID   - Player_name -  Height -  Overall_rating  ");
        checkState();
     });  
}
function dbQuery10(){
    let sqlQuery = `SELECT Team_ID,Team_name,count(Person_ID) as total From Support 
                    NATURAL JOIN Team group by(Team_ID) 
                    ORDER BY count(Person_ID) DESC limit 1 `;

    console.log("Team_ID  -  Team Name -  totalFan");
    db.all(sqlQuery, [], (err, rows) => {
    if (err) {
        throw err;
        }
         rows.forEach((row) => {
         console.log(row.Team_ID," - ",row.Team_name," - ",row.total);
        });
        console.log("Team_ID - Team_name - total");
        checkState();
     });  
}


function dbClose(){
    db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
    });
}