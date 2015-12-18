<?php

/* FOSUserBundle:Profile:show.html.twig */
class __TwigTemplate_3af00fa850afa3931342867b432a8825d717b4373e4b2c9984dc767a473c0efa extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Profile:show.html.twig", 1);
        $this->blocks = array(
            'fos_user_content' => array($this, 'block_fos_user_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "FOSUserBundle::layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_1ffa1119951fd06bc51d372b477dc96044f99600fccc31580ecebc268555e509 = $this->env->getExtension("native_profiler");
        $__internal_1ffa1119951fd06bc51d372b477dc96044f99600fccc31580ecebc268555e509->enter($__internal_1ffa1119951fd06bc51d372b477dc96044f99600fccc31580ecebc268555e509_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Profile:show.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_1ffa1119951fd06bc51d372b477dc96044f99600fccc31580ecebc268555e509->leave($__internal_1ffa1119951fd06bc51d372b477dc96044f99600fccc31580ecebc268555e509_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_b1218846fe4fe4f0378539c664546f46c601ef19c49f002e651a9d7e31640777 = $this->env->getExtension("native_profiler");
        $__internal_b1218846fe4fe4f0378539c664546f46c601ef19c49f002e651a9d7e31640777->enter($__internal_b1218846fe4fe4f0378539c664546f46c601ef19c49f002e651a9d7e31640777_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Profile:show_content.html.twig", "FOSUserBundle:Profile:show.html.twig", 4)->display($context);
        
        $__internal_b1218846fe4fe4f0378539c664546f46c601ef19c49f002e651a9d7e31640777->leave($__internal_b1218846fe4fe4f0378539c664546f46c601ef19c49f002e651a9d7e31640777_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Profile:show.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  40 => 4,  34 => 3,  11 => 1,);
    }
}
/* {% extends "FOSUserBundle::layout.html.twig" %}*/
/* */
/* {% block fos_user_content %}*/
/* {% include "FOSUserBundle:Profile:show_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
