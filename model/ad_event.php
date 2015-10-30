<?php
	class AdEvent {
		private $eventCode;
		private $name;
		private $startDate;
		private $endDate;
		private $description;
		private $adType;

		public function __construct() {

		}
		//setters and getters
		/*--------------------
			Event Code
		 ---------------------*/
		public function setEventCode($eventCode) {
			$this->eventCode = $eventCode;
		}

		public function getEventCode() {
			return $this->eventCode;
		}
		/*--------------------
			Name
		 ---------------------*/
		 public function setName($name) {
		 	$this->name = $name;
		 }

		 public function getName() {
		 	return $this->name;
		 }
		 /*--------------------
			Start Date
		 ---------------------*/
		 public function setStartDate($startDate) {
		 	$this->startDate = $startDate;
		 }

		 public function getStartDate() {
		 	return $this->startDate;
		 }
		 /*--------------------
			End Date
		 ---------------------*/
		 public function setEndDate($endDate) {
		 	$this->endDate = $endDate;
		 }

		 public function getEndDate() {
		 	return $this->endDate;
		 }
		 /*--------------------
			Description
		 ---------------------*/
		 public function setDescription($description) {
		 	$this->description = $description;
		 }

		 public function getDescription() {
		 	return $this->description;
		 }
		 /*--------------------
			Ad Type
		 ---------------------*/
		 public function setAdType($adType) {
		 	$this->adType = $adType;
		 }
		 public function getAdType() {
		 	return $this->adType;
		 }
	}
?>