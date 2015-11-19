<?php
require('../dao/item_dao.php');

$arrItemNumbers = $_POST['items'];
$promoCode = $_POST['pcode'];

$itemDAO = new ItemDAO();

foreach ($arrItemNumbers as $itemNumber){
	$itemDAO->removeItemFromPromotion($itemNumber, $promoCode);
	echo $itemNumber;
}

header("Location: ../view/promotion_page.html?promo_code=" . $promoCode);
?>
