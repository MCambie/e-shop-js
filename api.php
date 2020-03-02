<?php
ob_start();

header("Cache-Control: no-cache");
header('Content-Type: application/json');

// Connexion à la DB
require_once('./config.php');

function isPositiveFloat($str) {
    $toTest = (float) $str;
    return $toTest > 0 && filter_var($str, FILTER_VALIDATE_FLOAT);
}

// On essaie de se connecter à la DB
try {
    $pdo = new PDO(MYSQL_DSN, DB_USER, DB_PWD);
} catch (PDOException $e) {
    //echo $e->getMessage();       // A mettre ABSOLUMENT en commentaire en prod
    $pdo = null;                 
    $info = ['status' => 'error'];
    echo json_encode($info);
    die(); 
}

if (isset($_POST['query'])){
    switch($_POST['query']) {
        case 'like':
            if (isset($_POST['name']) && $_POST['name'] != '') {
                $sqlQuery = 'SELECT * FROM t_products
                             WHERE lower(name) LIKE lower(:name)
                             ORDER BY name ASC';
                $response = $pdo->prepare($sqlQuery);
                $response->bindValue(':name', '%' . $_POST['name'] . '%', PDO::PARAM_STR);
            }
            break;
        case 'priceRange':
            if (isset($_POST['min'], $_POST['max']) && isPositiveFloat($_POST['min']) && isPositiveFloat($_POST['max'])) {
                $sqlQuery = 'SELECT * FROM t_products
                             WHERE price BETWEEN :min AND :max
                             ORDER BY price ASC';
                $response = $pdo->prepare($sqlQuery);
                $response->bindValue(':min', $_POST['min'], PDO::PARAM_STR);
                $response->bindValue(':max', $_POST['max'], PDO::PARAM_STR);
            }
            break; 
        case 'category':
            if (isset($_POST['category']) && in_array($_POST['category'], ['CD', 'BOOK', 'GAME'])) {
                $sqlQuery = 'SELECT * FROM t_products
                             WHERE category = :cat
                             ORDER BY name ASC';
                $response = $pdo->prepare($sqlQuery);
                $response->bindValue(':cat', $_POST['category'], PDO::PARAM_STR);
            }
    }
} 

if (!isset($sqlQuery)) {
    $sqlQuery = 'SELECT * FROM t_products ORDER BY name ASC';
    $response = $pdo->prepare($sqlQuery);
}

$response->execute();

if ($response->rowCount() > 0) {
    // $resultSet reçoit en une fois un tableau (indexé) de tableaux (asssociatifs)
    $resultSet = $response->fetchAll(PDO::FETCH_ASSOC);
    
    $info = ['status' => 'ok', 'result' => $resultSet];
    echo json_encode($info);
} else {
    $info = ['status' => 'ok', 'result' => []];
    echo json_encode($info);
}

//sleep(2);

ob_flush();
?>