<?php

class Vorbereitung
{
    private $db;

    function __construct()
    {
        $this->api_res = "https://verleihneu.fhstp.ac.at/api/reservierung";
    }

    function getResByDate($date)
    {
        return file_get_contents("$this->api_res/byDateAusgabe/$date");
    }

    function getResByTimespan($startDate, $endDate){
        return file_get_contents("$this->api_res/byDate/$startDate/$endDate");
    }


}