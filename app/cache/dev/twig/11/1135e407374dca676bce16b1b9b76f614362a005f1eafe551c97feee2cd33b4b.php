<?php

/* FOSUserBundle::layout.html.twig */
class __TwigTemplate_6f8bfa467d7c1dfee7a62f49eafed4af60ac15b188dfd9fb31f3f736f0f88571 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("::base.html.twig", "FOSUserBundle::layout.html.twig", 1);
        $this->blocks = array(
            'header' => array($this, 'block_header'),
            'body' => array($this, 'block_body'),
            'fos_user_content' => array($this, 'block_fos_user_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "::base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_4996d243a28b15ebcd4249dd5a8b1320cb85022e056cf1626e272354accaa491 = $this->env->getExtension("native_profiler");
        $__internal_4996d243a28b15ebcd4249dd5a8b1320cb85022e056cf1626e272354accaa491->enter($__internal_4996d243a28b15ebcd4249dd5a8b1320cb85022e056cf1626e272354accaa491_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle::layout.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_4996d243a28b15ebcd4249dd5a8b1320cb85022e056cf1626e272354accaa491->leave($__internal_4996d243a28b15ebcd4249dd5a8b1320cb85022e056cf1626e272354accaa491_prof);

    }

    // line 2
    public function block_header($context, array $blocks = array())
    {
        $__internal_4f680ac87a811935c8c61021647d7acbc8d4bdc007b54a6eefc08998931aa115 = $this->env->getExtension("native_profiler");
        $__internal_4f680ac87a811935c8c61021647d7acbc8d4bdc007b54a6eefc08998931aa115->enter($__internal_4f680ac87a811935c8c61021647d7acbc8d4bdc007b54a6eefc08998931aa115_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "header"));

        // line 3
        echo "    <div class=\"header header-1\">
        <!-- img src=\"bundles/digitalartlab/images/secure.png\" class=\"img-header\" -->
        <img src=\"";
        // line 5
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("bundles/digitalartlab/images/secure.png"), "html", null, true);
        echo "\" alt=\"secure\" class=\"img-header\" />
    </div>
";
        
        $__internal_4f680ac87a811935c8c61021647d7acbc8d4bdc007b54a6eefc08998931aa115->leave($__internal_4f680ac87a811935c8c61021647d7acbc8d4bdc007b54a6eefc08998931aa115_prof);

    }

    // line 8
    public function block_body($context, array $blocks = array())
    {
        $__internal_601fba96bd3f49ab0f07dd1a9282bb9175391b956cd7143fca67d149e95aad0b = $this->env->getExtension("native_profiler");
        $__internal_601fba96bd3f49ab0f07dd1a9282bb9175391b956cd7143fca67d149e95aad0b->enter($__internal_601fba96bd3f49ab0f07dd1a9282bb9175391b956cd7143fca67d149e95aad0b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 9
        echo "    ";
        $this->displayBlock('fos_user_content', $context, $blocks);
        
        $__internal_601fba96bd3f49ab0f07dd1a9282bb9175391b956cd7143fca67d149e95aad0b->leave($__internal_601fba96bd3f49ab0f07dd1a9282bb9175391b956cd7143fca67d149e95aad0b_prof);

    }

    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_8a7ee59dd93c806da85fa25708301fb4c7dc77ae942cd7c20733bcb3655905e7 = $this->env->getExtension("native_profiler");
        $__internal_8a7ee59dd93c806da85fa25708301fb4c7dc77ae942cd7c20733bcb3655905e7->enter($__internal_8a7ee59dd93c806da85fa25708301fb4c7dc77ae942cd7c20733bcb3655905e7_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 10
        echo "    ";
        
        $__internal_8a7ee59dd93c806da85fa25708301fb4c7dc77ae942cd7c20733bcb3655905e7->leave($__internal_8a7ee59dd93c806da85fa25708301fb4c7dc77ae942cd7c20733bcb3655905e7_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle::layout.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  75 => 10,  62 => 9,  56 => 8,  46 => 5,  42 => 3,  36 => 2,  11 => 1,);
    }
}
/* {% extends '::base.html.twig' %}*/
/* {% block header %}*/
/*     <div class="header header-1">*/
/*         <!-- img src="bundles/digitalartlab/images/secure.png" class="img-header" -->*/
/*         <img src="{{ asset('bundles/digitalartlab/images/secure.png')}}" alt="secure" class="img-header" />*/
/*     </div>*/
/* {% endblock %}*/
/* {% block body %}*/
/*     {% block fos_user_content %}*/
/*     {% endblock fos_user_content %}*/
/* {% endblock %}*/
/* */
