<?php
require('../dao/promo_dao.php');

$arrPromoCode = $_POST['promotions'];
$eventCode = $_POST['ecode'];

$promoDAO = new PromoDAO();

foreach ($arrPromoCode as $promoCode){
	$promoDAO->removePromotionFromAdEvent($promoCode, $eventCode);
	echo $promoCode;
}

header("Location: ../view/ad_event_page.html?eventCode=" . $eventCode);
?>