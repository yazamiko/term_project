<?php
require('../dao/item_dao.php');

session_start();
$arrItemNumbers = $_SESSION['item_number_values'];

$promoCode = $_GET['promo_code'];

$itemDAO = new ItemDAO();

foreach ($arrItemNumbers as $itemNumber){
	$itemDAO->removeItemFromPromotion($itemNumber, $promoCode);
	echo $itemNumber;
}

header("Location: ../");
?>
