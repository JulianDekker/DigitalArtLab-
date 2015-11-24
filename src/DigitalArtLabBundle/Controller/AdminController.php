<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use  Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * admin controller.
 */
class AdminController extends Controller
{

    /**
     * @Route("/admin", name="admin")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function adminIndexAction()
    {
        $em = $this->get('doctrine')->getManager();
        $aanwezig = $em->getRepository('DigitalArtLabBundle:User')->findByAanwezig(1);


        return $this->render('DigitalArtLabBundle:Admin:index.html.twig', array(
            'aanwezig' => $aanwezig
        ));
    }

    /**
     * @Route("/admin/gebruikersbeheer", name="admin_usermanager")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function adminUsermanagerAction()
    {
        $em = $this->get('doctrine')->getManager();
        $users = $em->getRepository('DigitalArtLabBundle:User')->findAllOrderedByAanwezig();


        return $this->render('DigitalArtLabBundle:Admin:usermanager.html.twig', array(
            'users' => $users
        ));
    }


}