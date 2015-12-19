<?php

namespace Proxies\__CG__\DigitalArtLabBundle\Entity;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class transaction extends \DigitalArtLabBundle\Entity\transaction implements \Doctrine\ORM\Proxy\Proxy
{
    /**
     * @var \Closure the callback responsible for loading properties in the proxy object. This callback is called with
     *      three parameters, being respectively the proxy object to be initialized, the method that triggered the
     *      initialization process and an array of ordered parameters that were passed to that method.
     *
     * @see \Doctrine\Common\Persistence\Proxy::__setInitializer
     */
    public $__initializer__;

    /**
     * @var \Closure the callback responsible of loading properties that need to be copied in the cloned object
     *
     * @see \Doctrine\Common\Persistence\Proxy::__setCloner
     */
    public $__cloner__;

    /**
     * @var boolean flag indicating if this object was already initialized
     *
     * @see \Doctrine\Common\Persistence\Proxy::__isInitialized
     */
    public $__isInitialized__ = false;

    /**
     * @var array properties to be lazy loaded, with keys being the property
     *            names and values being their default values
     *
     * @see \Doctrine\Common\Persistence\Proxy::__getLazyProperties
     */
    public static $lazyPropertiesDefaults = array();



    /**
     * @param \Closure $initializer
     * @param \Closure $cloner
     */
    public function __construct($initializer = null, $cloner = null)
    {

        $this->__initializer__ = $initializer;
        $this->__cloner__      = $cloner;
    }







    /**
     * 
     * @return array
     */
    public function __sleep()
    {
        if ($this->__isInitialized__) {
            return array('__isInitialized__', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'id', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'user', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'adminName', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'time', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'amount', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'oldbalance', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'newbalance');
        }

        return array('__isInitialized__', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'id', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'user', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'adminName', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'time', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'amount', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'oldbalance', '' . "\0" . 'DigitalArtLabBundle\\Entity\\transaction' . "\0" . 'newbalance');
    }

    /**
     * 
     */
    public function __wakeup()
    {
        if ( ! $this->__isInitialized__) {
            $this->__initializer__ = function (transaction $proxy) {
                $proxy->__setInitializer(null);
                $proxy->__setCloner(null);

                $existingProperties = get_object_vars($proxy);

                foreach ($proxy->__getLazyProperties() as $property => $defaultValue) {
                    if ( ! array_key_exists($property, $existingProperties)) {
                        $proxy->$property = $defaultValue;
                    }
                }
            };

        }
    }

    /**
     * 
     */
    public function __clone()
    {
        $this->__cloner__ && $this->__cloner__->__invoke($this, '__clone', array());
    }

    /**
     * Forces initialization of the proxy
     */
    public function __load()
    {
        $this->__initializer__ && $this->__initializer__->__invoke($this, '__load', array());
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __isInitialized()
    {
        return $this->__isInitialized__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitialized($initialized)
    {
        $this->__isInitialized__ = $initialized;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setInitializer(\Closure $initializer = null)
    {
        $this->__initializer__ = $initializer;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __getInitializer()
    {
        return $this->__initializer__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     */
    public function __setCloner(\Closure $cloner = null)
    {
        $this->__cloner__ = $cloner;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific cloning logic
     */
    public function __getCloner()
    {
        return $this->__cloner__;
    }

    /**
     * {@inheritDoc}
     * @internal generated method: use only when explicitly handling proxy specific loading logic
     * @static
     */
    public function __getLazyProperties()
    {
        return self::$lazyPropertiesDefaults;
    }

    
    /**
     * {@inheritDoc}
     */
    public function getUser()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getUser', array());

        return parent::getUser();
    }

    /**
     * {@inheritDoc}
     */
    public function setUser($user)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setUser', array($user));

        return parent::setUser($user);
    }

    /**
     * {@inheritDoc}
     */
    public function getId()
    {
        if ($this->__isInitialized__ === false) {
            return (int)  parent::getId();
        }


        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getId', array());

        return parent::getId();
    }

    /**
     * {@inheritDoc}
     */
    public function setAdminName($adminName)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setAdminName', array($adminName));

        return parent::setAdminName($adminName);
    }

    /**
     * {@inheritDoc}
     */
    public function getAdminName()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getAdminName', array());

        return parent::getAdminName();
    }

    /**
     * {@inheritDoc}
     */
    public function setTime($time)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setTime', array($time));

        return parent::setTime($time);
    }

    /**
     * {@inheritDoc}
     */
    public function getTime()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getTime', array());

        return parent::getTime();
    }

    /**
     * {@inheritDoc}
     */
    public function setamount($amount)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setamount', array($amount));

        return parent::setamount($amount);
    }

    /**
     * {@inheritDoc}
     */
    public function getamount()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getamount', array());

        return parent::getamount();
    }

    /**
     * {@inheritDoc}
     */
    public function setOldbalance($oldbalance)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setOldbalance', array($oldbalance));

        return parent::setOldbalance($oldbalance);
    }

    /**
     * {@inheritDoc}
     */
    public function getOldbalance()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getOldbalance', array());

        return parent::getOldbalance();
    }

    /**
     * {@inheritDoc}
     */
    public function setNewbalance($newbalance)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setNewbalance', array($newbalance));

        return parent::setNewbalance($newbalance);
    }

    /**
     * {@inheritDoc}
     */
    public function getNewbalance()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getNewbalance', array());

        return parent::getNewbalance();
    }

}