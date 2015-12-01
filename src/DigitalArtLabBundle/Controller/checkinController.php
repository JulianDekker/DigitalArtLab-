<?php

namespace DigitalArtLabBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use  Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use DigitalArtLabBundle\Entity\checkin;
use DigitalArtLabBundle\Form\checkinType;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\DateTime;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Model\UserInterface;

/**
 * checkin controller.
 *
 */
class checkinController extends Controller
{
    /**
     * @Route("/profile/{username}", name="userprofile")
     * @Template()
     * @Security("has_role('ROLE_USER')")
     */
    public function showOtherAction($username){

        $em = $this->get('doctrine')->getManager();
        $user = $em->getRepository('DigitalArtLabBundle:User')->findOneByUsername($username);
        $sessions = $em->getRepository('DigitalArtLabBundle:checkin')->findLastSessions($user->getUsername() );

        return $this->render('FOSUserBundle:Profile:show.html.twig', array(
            'user' => $user,
            'ses' => $sessions
        ));

    }

    /**
     * @Route("/profile/{username}/edit")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function editUserProfileAction(request $request, $username){

        $em = $this->get('doctrine')->getManager();
        $user = $em->getRepository('DigitalArtLabBundle:User')->findOneByUsername($username);

        $form = $this->createFormBuilder($user)
            ->add('email' , 'email')
            ->add('firstname', 'firstname')
            ->add('save', 'submit', array('label' => 'Create Task'))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            // ... perform some action, such as saving the task to the database

            return $this->redirectToRoute('task_success');
        }

        return $this->render('FOSUserBundle:Profile:edit.html.twig', array(
            'form' => $form->createView(),
        ));

    }


    /**
     * @Route("/profile/{username}/checkin", name="checkin")
     * @Template()
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function checkinAction($username){

        $em = $this->get('doctrine')->getManager();
        $user = $em->getRepository('DigitalArtLabBundle:User')->findOneByUsername($username);

        $aanwezig = $user->getAanwezig();

        if ($aanwezig == 0 || null){
            $user->setAanwezig(1);
            $checkin = new checkin();
            $checkin->setUsername($user->getUsername());
            $checkin->setTimein(new \DateTime('now'));
            $em->persist($checkin);

        }
        else{
            $user->setAanwezig(0);

            $checkout = $em->getRepository('DigitalArtLabBundle:checkin')->findOneBy(
                array('username' => $username),
                array('id' => 'DESC')
            );

            $checkout->setTimeout(new \DateTime('now'));
            $duration = date_diff($checkout->getTimein(), $checkout->getTimeout());

            $time = new \DateTime($duration->h.":".$duration->i.":".$duration->s) ;

            $checkout->setSessionduration($time);
        }


        $em->flush();
        /*return $this->render('DigitalArtLabBundle:checkin:index.html.twig', array(
            'user' => $user
        ));*/
        return $this->redirectToRoute('admin_usermanager', array(), 301);

    }


}
