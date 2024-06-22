<?php 
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $statu = $_POST["statu"];
    if($statu == "id_modifie"){
   $id = $_POST["ido"];
    echo $id;
    }elseif ($statu == "category") {
        $ido = $_POST["ido"];
        $content = $_POST["content"];
        echo  $ido;
        echo $content;
        try {
            $db = new PDO("mysql:host =localhost;dbname=digital","root","");
            $stm = $db->prepare("UPDATE `category` SET NAE_CATIGORY= '$content' WHERE ID_CATEGORY='$ido'");
            $stm->execute();
            echo "true";
            header("Refresh: 5; url=".$_SERVER['PHP_SELF']);
        } catch(PDOException $e) {
            echo "UPDATED not successfully: " . $e->getMessage();
        }



    }elseif ($statu == "addcategory") {
        $content = $_POST["content"];
        echo $content;
        try {
            $db = new PDO("mysql:host =localhost;dbname=digital","root","");
            $stm = $db->prepare("INSERT INTO category (NAE_CATIGORY)VALUES ('$content')");
            $stm->execute();
            echo "true";
            header("Refresh: 5; url=".$_SERVER['PHP_SELF']);
        } catch(PDOException $e) {
            echo "UPDATED not successfully: " . $e->getMessage();
        }





    }elseif($statu == "id_delete"){
        $inbt = $_POST["inbt"];
        $id = $_POST["ido"];
         echo $id;

         if ($inbt == "catigory") {
            try {
            $db = new PDO("mysql:host =localhost;dbname=digital","root","");
            $stm = $db->prepare("DELETE FROM category WHERE ID_CATEGORY='$id'");
            $stm->execute();
            echo "true";
            header("Refresh: 5; url=".$_SERVER['PHP_SELF']);
        } catch(PDOException $e) {
            echo "UPDATED not successfully: " . $e->getMessage();
        }



        }elseif ($inbt == "group") {
            // try {
            //     $db = new PDO("mysql:host =localhost;dbname=digital","root","");
            //     $stm = $db->prepare("DELETE FROM group WHERE ID_GRP='$id'");
            //     $stm->execute();
            //     echo "true";
            //     header("Refresh: 5; url=".$_SERVER['PHP_SELF']);
            // } catch(PDOException $e) {
            //     echo "UPDATED not successfully: " . $e->getMessage();
            // }
            try {
                $db = new PDO("mysql:host=localhost;dbname=digital", "root", "");
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
                // Begin transaction
                $db->beginTransaction();
            
                // Delete dependent rows in product table
                $stm = $db->prepare("DELETE FROM product WHERE ID_GRP = :id");
                $stm->bindParam(':id', $id, PDO::PARAM_INT);
                $stm->execute();
            
                // Delete row in group table
                $stm = $db->prepare("DELETE FROM `group` WHERE ID_GRP = :id");
                $stm->bindParam(':id', $id, PDO::PARAM_INT);
                $stm->execute();
            
                // Commit transaction
                $db->commit();
            
                echo "true";
                header("Refresh: 5; url=" . $_SERVER['PHP_SELF']);
            } catch(PDOException $e) {
                // Rollback transaction in case of error
                $db->rollBack();
                echo "Deletion not successful: " . $e->getMessage();
            }
        }
         
    }elseif ($statu == "groupM") {
        $ido = $_POST["ido"];
        $content = $_POST["content"];
        echo  $ido;
        echo $content;
        try {
            $db = new PDO("mysql:host =localhost;dbname=digital","root","");
            $stm = $db->prepare("UPDATE `group` SET NAME_GROUP= '$content' WHERE ID_GRP='$ido'");
            $stm->execute();
            echo "true";
            header("Refresh: 5; url=".$_SERVER['PHP_SELF']);
        } catch(PDOException $e) {
            echo "UPDATED not successfully: " . $e->getMessage();
        }

    }elseif ($statu == "addgroup") {
        $content = $_POST["content"];
        $sel = $_POST["sel"];
        try {
            $db = new PDO("mysql:host=localhost;dbname=digital", "root", "");
            $stm = $db->prepare("INSERT INTO group(ID_CATEGORY,NAME_GROUP) VALUES ('$sel','$content')");
            $stm->execute();
            echo "true";
            header("Refresh: 5; url=" . $_SERVER['PHP_SELF']);
        } catch (PDOException $e) {
            echo "UPDATED not successfully: " . $e->getMessage();
        }
    }
};
?>