<?php

namespace DigitalArtLabBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * checkin
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="DigitalArtLabBundle\Entity\checkinRepository")
 */
class checkin
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=255)
     *
     */
    private $username;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="timein", type="datetime")
     */
    private $timein;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="timeout", type="datetime", nullable=true)
     */
    private $timeout;

    /**
     * @var \Time
     *
     * @ORM\Column(name="sessionduration", type="time", nullable=true)
     */
    private $sessionduration;




    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set timein
     *
     * @param \DateTime $timein
     *
     * @return checkin
     */
    public function setTimein($timein)
    {
        $this->timein = $timein;

        return $this;
    }

    /**
     * Get timein
     *
     * @return \DateTime
     */
    public function getTimein()
    {
        return $this->timein;
    }

    /**
     * Set timeout
     *
     * @param \DateTime $timeout
     *
     * @return checkin
     */
    public function setTimeout($timeout)
    {
        $this->timeout = $timeout;

        return $this;
    }

    /**
     * Get timeout
     *
     * @return \DateTime
     */
    public function getTimeout()
    {
        return $this->timeout;
    }

    /**
     * Set sessionduration
     *
     * @param \DateTime $sessionduration
     *
     * @return checkin
     */
    public function setSessionduration($sessionduration)
    {
        $this->sessionduration = $sessionduration;

        return $this;
    }

    /**
     * Get sessionduration
     *
     * @return \DateTime
     */
    public function getSessionduration()
    {
        return $this->sessionduration;
    }

    /**
     * Set username
     *
     * @param string $username
     *
     * @return checkin
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set user
     *
     * @param \DigitalArtLabBundle\Entity\User $user
     *
     * @return checkin
     */
    public function setUser(\DigitalArtLabBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \DigitalArtLabBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }
}
