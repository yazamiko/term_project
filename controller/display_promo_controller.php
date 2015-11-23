<?php
require('../dao/promo_dao.php');

session_start();
$arrPromoCode = $_SESSION['ad_event_promo_code'];

$promoDAO = new PromoDAO();

$result = $promoDAO->retrievePromotions($arrPromoCode);

$list = array();
foreach($result as $rs) {
   $list[] = array('PromoCode' => $rs->getPromoCode(),
   					'Name' => $rs->getName(),
   					'Description' => $rs->getDescription(),
   					'AmountOff' => $rs->getAmountOff(),
   					'PromoType' => $rs->getPromoType());
}

echo(json_encode($list));
?>