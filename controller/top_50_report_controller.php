<?php
require('../dao/ad_event_dao.php');

$adDAO = new AdDAO();

$result = $adDAO->fetchReport4();

$list = array();
foreach($result as $rs) {
   $list[] = array('ItemNumber' => $rs->getItemNumber(),
   					'PromoCode' => $rs->getPromoCode(),
   					'FullRetailPrice' => $rs->getFullRetailPrice(),
   					'SalePrice' => $rs->getSalePrice(),
   					'Savings' => $rs->getSavings(),
   					'EventCodes' => $rs->getEventCode());
}

echo(json_encode($list));
?>