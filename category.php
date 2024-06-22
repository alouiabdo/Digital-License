<?php
    
        try {
            $db = new PDO("mysql:host =localhost;dbname=digital","root","");
            $stm = $db->prepare("SELECT * FROM `category`");
            $stm ->execute();
            $rep =  $stm -> fetchAll();
            echo json_encode($rep);
        }catch(PDOException $e) {
            echo "note valied";
        }
?>