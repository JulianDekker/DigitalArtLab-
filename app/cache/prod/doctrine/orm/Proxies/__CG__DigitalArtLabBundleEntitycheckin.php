<?php

namespace Proxies\__CG__\DigitalArtLabBundle\Entity;

/**
 * DO NOT EDIT THIS FILE - IT WAS CREATED BY DOCTRINE'S PROXY GENERATOR
 */
class checkin extends \DigitalArtLabBundle\Entity\checkin implements \Doctrine\ORM\Proxy\Proxy
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
            return array('__isInitialized__', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'id', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'username', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'timein', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'timeout', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'sessionduration');
        }

        return array('__isInitialized__', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'id', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'username', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'timein', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'timeout', '' . "\0" . 'DigitalArtLabBundle\\Entity\\checkin' . "\0" . 'sessionduration');
    }

    /**
     * 
     */
    public function __wakeup()
    {
        if ( ! $this->__isInitialized__) {
            $this->__initializer__ = function (checkin $proxy) {
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
    public function setTimein($timein)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setTimein', array($timein));

        return parent::setTimein($timein);
    }

    /**
     * {@inheritDoc}
     */
    public function getTimein()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getTimein', array());

        return parent::getTimein();
    }

    /**
     * {@inheritDoc}
     */
    public function setTimeout($timeout)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setTimeout', array($timeout));

        return parent::setTimeout($timeout);
    }

    /**
     * {@inheritDoc}
     */
    public function getTimeout()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getTimeout', array());

        return parent::getTimeout();
    }

    /**
     * {@inheritDoc}
     */
    public function setSessionduration($sessionduration)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setSessionduration', array($sessionduration));

        return parent::setSessionduration($sessionduration);
    }

    /**
     * {@inheritDoc}
     */
    public function getSessionduration()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getSessionduration', array());

        return parent::getSessionduration();
    }

    /**
     * {@inheritDoc}
     */
    public function setUsername($username)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setUsername', array($username));

        return parent::setUsername($username);
    }

    /**
     * {@inheritDoc}
     */
    public function getUsername()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getUsername', array());

        return parent::getUsername();
    }

    /**
     * {@inheritDoc}
     */
    public function setUser(\DigitalArtLabBundle\Entity\User $user = NULL)
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'setUser', array($user));

        return parent::setUser($user);
    }

    /**
     * {@inheritDoc}
     */
    public function getUser()
    {

        $this->__initializer__ && $this->__initializer__->__invoke($this, 'getUser', array());

        return parent::getUser();
    }

}