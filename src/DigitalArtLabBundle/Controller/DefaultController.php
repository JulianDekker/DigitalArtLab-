<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     * @Template()
     */
    public function indexAction()
    {
       return $this->render('DigitalArtLabBundle:default:index.html.twig');
    }

    /**
     * @Route("/profile/{username}")
     * @Template()
     */
    /*public function showOtherAction($username){

        $em = $this->get('doctrine')->getManager();
        $user = $em->getRepository('DigitalArtLabBundle:User')->findOneByUsername($username);

        return $this->render('FOSUserBundle:Profile:show.html.twig', array(
            'user' => $user
        ));

    }*/
}
