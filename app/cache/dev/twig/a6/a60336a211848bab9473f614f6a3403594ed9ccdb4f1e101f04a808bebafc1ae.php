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
        $__internal_11c505b0440d33842ac7d86a1d25bb6c7a2e65e54f923313240a5be41d2de231 = $this->env->getExtension("native_profiler");
        $__internal_11c505b0440d33842ac7d86a1d25bb6c7a2e65e54f923313240a5be41d2de231->enter($__internal_11c505b0440d33842ac7d86a1d25bb6c7a2e65e54f923313240a5be41d2de231_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Profile:show.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_11c505b0440d33842ac7d86a1d25bb6c7a2e65e54f923313240a5be41d2de231->leave($__internal_11c505b0440d33842ac7d86a1d25bb6c7a2e65e54f923313240a5be41d2de231_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_bdf23d49efd264580f3f80eadfa1347f041feb50f9b1799ab240e18c9cbd0882 = $this->env->getExtension("native_profiler");
        $__internal_bdf23d49efd264580f3f80eadfa1347f041feb50f9b1799ab240e18c9cbd0882->enter($__internal_bdf23d49efd264580f3f80eadfa1347f041feb50f9b1799ab240e18c9cbd0882_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Profile:show_content.html.twig", "FOSUserBundle:Profile:show.html.twig", 4)->display($context);
        
        $__internal_bdf23d49efd264580f3f80eadfa1347f041feb50f9b1799ab240e18c9cbd0882->leave($__internal_bdf23d49efd264580f3f80eadfa1347f041feb50f9b1799ab240e18c9cbd0882_prof);

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
