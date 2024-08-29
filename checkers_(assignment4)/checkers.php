<!DOCTYPE html>
<html lang="en">
    <head>
        <style><?php include 'checkers.css';?></style>

        <title>Checkers</title>
    
    </head>
    <body>    
        <?php
            // define constant SIZE with the value of 8
            define("SIZE", 8);
            
            // build the HTML
            // display as an <h1> the word Checkers using class 'title'
            echo "<h1 class='title'>Checkers</h1>";

            // create a <div> with the id 'board'
            echo "<div id='board'>";
            
                // create a <table> with classes 'checkers' and 'container'
                echo "<table class='checkers container'";
                    for($i = 0; $i < SIZE; $i++) { //row
                        echo "<tr class='row'>";
                        for($j = 0; $j < SIZE; $j++) { //column
                            if($i % 2 == 0 && $j % 2 == 0 || $i % 2 != 0 && $j % 2 != 0) {
                                echo "<td class='empty'></td>";
                            }
                            else {
                                if($i < 3) {
                                    echo "<td><img src='red_pawn.png' alt='red' width='30></td>";
                                }
                                else if($row > 4) {
                                    echo "<td><img src='black_pawn.png' alt='black' width='30></td>";
                                }
                                else {
                                    echo "<td class='empty'></td>";
                                }
                            }
                        }
                        echo "</tr>";
                    }
                echo "</table>";
            
            echo "</div>";
        ?>
    </body>
</html>