<?php
require('../dao/promo_dao.php');

$eventCode = $_GET['eventCode'];
$promoCode = $_GET['promo_code'];

$promoDAO = new PromoDAO();
echo $promoDAO->removePromotionFromAdEvent($eventCode, $promoCode);

header("Location: ../");
?>