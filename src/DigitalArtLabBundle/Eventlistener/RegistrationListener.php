<?php
namespace DigitalArtLabBundle\Eventlistener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;




/**
 * RegistrationListener
 *
 */
class RegistrationListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_SUCCESS => 'onRegistrationSuccess',
        );
    }

    public function onRegistrationSuccess(FormEvent $event)
    {
        $user = $event->getForm()->getData();
        $username = $user->getUserName();
        $checkInUrl = 'http://localhost:1337/digitalartlab/web/profile/' . $username . '/checkin';
        $user->setCheckinurl($checkInUrl);
    }

}