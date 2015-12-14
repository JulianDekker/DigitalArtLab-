<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * admin controller.
 * @Route("/admin/stats")
 */
class StatestiekenController extends Controller
{

    /**
     * Lists all transaction entities.
     *
     * @Route("/", name="admin_stats")
     * @Method("GET")
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $transactions = $em->getRepository('DigitalArtLabBundle:transaction')->findBy([], ['time' => 'DESC']);
        $users = $em->getRepository('DigitalArtLabBundle:User')->findAll();
        $checkins = $em->getRepository('DigitalArtLabBundle:checkin')->findBy([], ['timein' => 'DESC']);

        $time = '00:00:00';
        foreach ($checkins as $checkin){
           $time = sum_the_time($time, date_format($checkin->getSessionduration(), 'H:i:s') );
        }

        $groupsessions = $em->getRepository('DigitalArtLabBundle:checkin')->groupSessions();
        $newsession = array();
        foreach ($groupsessions as $session){
            array_push($newsession, $session['date']);
        }
        $count = array_count_values($newsession);

        return $this->render('DigitalArtLabBundle:admin:stats.html.twig', array(
            'transactions' => $transactions,
            'users' => $users,
            'checkins' => $checkins,
            'totaaluren' => $time,
            'groupsessions' => $count,
        ));
    }

}

function sum_the_time($time1, $time2) {
    $times = array($time1, $time2);
    $seconds = 0;
    foreach ($times as $time)
    {
        list($hour,$minute,$second) = explode(':', $time);
        $seconds += $hour*3600;
        $seconds += $minute*60;
        $seconds += $second;
    }
    $hours = floor($seconds/3600);
    $seconds -= $hours*3600;
    $minutes  = floor($seconds/60);
    $seconds -= $minutes*60;
    // return "{$hours}:{$minutes}:{$seconds}";
    return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds); // Thanks to Patrick
}