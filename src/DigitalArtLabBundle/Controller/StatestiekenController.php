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


        return $this->render('DigitalArtLabBundle:admin:stats.html.twig', array(
            'transactions' => $transactions,
            'users' => $users,
            'checkins' => $checkins
        ));
    }

}