<?php
// src/AppBundle/Entity/User.php

namespace DigitalArtLabBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
Use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="DigitalArtLabBundle\Entity\UserRepository")
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     */
    protected $id;


    /**
     * @Assert\NotBlank(message="Please enter your name.", groups={"Registration", "Profile"})
     * @Assert\Length(
     *     min=2,
     *     max=255,
     *     minMessage="The name is too short.",
     *     maxMessage="The name is too long.",
     *     groups={"Registration", "Profile"}
     * )
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    protected $firstname;

    /**
     * @Assert\NotBlank(message="Please enter your name.", groups={"Registration", "Profile"})
     * @Assert\Length(
     *     min=2,
     *     max=255,
     *     minMessage="The name is too short.",
     *     maxMessage="The name is too long.",
     *     groups={"Registration", "Profile"}
     * )
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    protected $lastname;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    protected $address;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    protected $zipcode;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */

    protected $expertises;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */

    protected $interesses;

    /**
     * @ORM\Column(type="integer", length=100, nullable=true)
     */

    protected $aanwezig;

    /**
     * @ORM\Column(type="integer", length=100, nullable=true)
     */
    protected $saldo;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */

    protected $checkinurl;



    /**
     * Set firstname
     *
     * @param string $firstname
     *
     * @return User
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     *
     * @return User
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set address
     *
     * @param string $address
     *
     * @return User
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set zipcode
     *
     * @param string $zipcode
     *
     * @return User
     */
    public function setZipcode($zipcode)
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    /**
     * Get zipcode
     *
     * @return string
     */
    public function getZipcode()
    {
        return $this->zipcode;
    }

    /**
     * Set expertises
     *
     * @param string $expertises
     *
     * @return User
     */
    public function setExpertises($expertises)
    {
        $this->expertises = nl2br($expertises);

        return $this;
    }

    /**
     * Get expertises
     *
     * @return string
     */
    public function getExpertises()
    {
        return nl2br($this->expertises);
    }

    /**
     * Set interesses
     *
     * @param string $interesses
     *
     * @return User
     */
    public function setInteresses($interesses)
    {
        $this->interesses = $interesses;

        return $this;
    }

    /**
     * Get interesses
     *
     * @return string
     */
    public function getInteresses()
    {
        return nl2br($this->interesses);
    }

    /**
     * Set aanwezig
     *
     * @param integer $aanwezig
     *
     * @return User
     */
    public function setAanwezig($aanwezig)
    {
        $this->aanwezig = $aanwezig;

        return $this;
    }

    /**
     * Get aanwezig
     *
     * @return integer
     */
    public function getAanwezig()
    {
        return $this->aanwezig;
    }

    /**
     * Set saldo
     *
     * @param integer $saldo
     *
     * @return User
     */
    public function setSaldo($saldo)
    {
        $this->saldo = $saldo;

        return $this;
    }

    /**
     * Get saldo
     *
     * @return integer
     */
    public function getSaldo()
    {
        return $this->saldo;
    }

    /**
     * Set checkinurl
     *
     * @param string $checkinurl
     *
     * @return User
     */
    public function setCheckinurl($checkinurl)
    {
        $this->checkinurl = $checkinurl;

        return $this;
    }

    /**
     * Get checkinurl
     *
     * @return string
     */
    public function getCheckinurl()
    {
        return $this->checkinurl;
    }


    public function __construct()
    {
        parent::__construct();
        // your own logic
    }

    /**
     * Add checkin
     *
     * @param \DigitalArtLabBundle\Entity\checkin $checkin
     *
     * @return User
     */
    public function addCheckin(\DigitalArtLabBundle\Entity\checkin $checkin)
    {
        $this->checkin[] = $checkin;

        return $this;
    }

    /**
     * Remove checkin
     *
     * @param \DigitalArtLabBundle\Entity\checkin $checkin
     */
    public function removeCheckin(\DigitalArtLabBundle\Entity\checkin $checkin)
    {
        $this->checkin->removeElement($checkin);
    }

    /**
     * Get checkin
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCheckin()
    {
        return $this->checkin;
    }
}
