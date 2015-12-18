<?php

/* FOSUserBundle::layout.html.twig */
class __TwigTemplate_5c673b36fcd2d44a0ab7047589f1b205e750d21e98ba73289c7b1a07900ce2d9 extends Twig_Template
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
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 2
    public function block_header($context, array $blocks = array())
    {
        // line 3
        echo "    <div class=\"header header-1\">
        <!-- img src=\"bundles/digitalartlab/images/secure.png\" class=\"img-header\" -->
        <img src=\"";
        // line 5
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("bundles/digitalartlab/images/secure.png"), "html", null, true);
        echo "\" alt=\"secure\" class=\"img-header\" />
    </div>
";
    }

    // line 8
    public function block_body($context, array $blocks = array())
    {
        // line 9
        echo "    ";
        $this->displayBlock('fos_user_content', $context, $blocks);
    }

    public function block_fos_user_content($context, array $blocks = array())
    {
        // line 10
        echo "    ";
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
        return array (  54 => 10,  47 => 9,  44 => 8,  37 => 5,  33 => 3,  30 => 2,  11 => 1,);
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
