<?php

namespace DigitalArtLabBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * transaction
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="DigitalArtLabBundle\Entity\transactionRepository")
 */
class transaction
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
     * @var ArrayCollection
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="transaction")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */

    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=255)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="admin_name", type="string", length=255)
     */
    private $adminName;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="time", type="datetime")
     */
    private $time;

    /**
     * @var integer
     *
     * @ORM\Column(name="amount", type="integer")
     */
    private $amount;

    /**
     * @var integer
     *
     * @ORM\Column(name="oldbalance", type="integer")
     */
    private $oldbalance;

    /**
     * @var integer
     *
     * @ORM\Column(name="newbalance", type="integer")
     */
    private $newbalance;


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
     * Set username
     *
     * @param string $username
     *
     * @return transaction
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
     * Set adminName
     *
     * @param string $adminName
     *
     * @return transaction
     */
    public function setAdminName($adminName)
    {
        $this->adminName = $adminName;

        return $this;
    }

    /**
     * Get adminName
     *
     * @return string
     */
    public function getAdminName()
    {
        return $this->adminName;
    }

    /**
     * Set time
     *
     * @param \DateTime $time
     *
     * @return transaction
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get time
     *
     * @return \DateTime
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set amount
     *
     * @param integer $amount
     *
     * @return transaction
     */
    public function setamount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return integer
     */
    public function getamount()
    {
        return $this->amount;
    }

    /**
     * Set oldbalance
     *
     * @param integer $oldbalance
     *
     * @return transaction
     */
    public function setOldbalance($oldbalance)
    {
        $this->oldbalance = $oldbalance;

        return $this;
    }

    /**
     * Get oldbalance
     *
     * @return integer
     */
    public function getOldbalance()
    {
        return $this->oldbalance;
    }

    /**
     * Set newbalance
     *
     * @param integer $newbalance
     *
     * @return transaction
     */
    public function setNewbalance($newbalance)
    {
        $this->newbalance = $newbalance;

        return $this;
    }

    /**
     * Get newbalance
     *
     * @return integer
     */
    public function getNewbalance()
    {
        return $this->newbalance;
    }

    public function __construct()
    {
        $this->time = new \DateTime();
    }
}

