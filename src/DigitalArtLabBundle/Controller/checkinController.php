<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use DigitalArtLabBundle\Entity\checkin;
use DigitalArtLabBundle\Form\checkinType;

/**
 * checkin controller.
 *
 * @Route("/profile/{username}/checkin")
 */
class checkinController extends Controller
{
    /**
     * @Route("/}")
     * @Template()
     */
    public function checkAction($username){

        $em = $this->get('doctrine')->getManager();
        $user = $em->getRepository('DigitalArtLabBundle:User')->findOneByUsername($username);

        return $this->render('FOSUserBundle:Profile:show.html.twig', array(
            'user' => $user
        ));

    }


}
