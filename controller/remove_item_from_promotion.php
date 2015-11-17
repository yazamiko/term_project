<?php
require('../dao/item_dao.php');

$itemNumber = $_GET['item_number'];
$promoCode = $_GET['promo_code'];

$itemDAO = new ItemDAO();
echo $itemDAO->removeItemFromPromotion($itemNumber, $promoCode);

header("Location: ../");
?>
