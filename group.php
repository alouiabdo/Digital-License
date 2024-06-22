<?php
    
        try {
            $db = new PDO("mysql:host =localhost;dbname=digital","root","");
            $stm = $db->prepare("SELECT * FROM `group`INNER JOIN `category` ON group.ID_CATEGORY = category.ID_CATEGORY");
            $stm ->execute();
            $rep =  $stm -> fetchAll();
            echo json_encode($rep);
        }catch(PDOException $e) {
            echo "note valied";
        }
?>