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
        $__internal_5f82f362f9b15f56c3bb5df2565e8bf32db2525b7d458b97a135ae3236530e3c = $this->env->getExtension("native_profiler");
        $__internal_5f82f362f9b15f56c3bb5df2565e8bf32db2525b7d458b97a135ae3236530e3c->enter($__internal_5f82f362f9b15f56c3bb5df2565e8bf32db2525b7d458b97a135ae3236530e3c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle::layout.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_5f82f362f9b15f56c3bb5df2565e8bf32db2525b7d458b97a135ae3236530e3c->leave($__internal_5f82f362f9b15f56c3bb5df2565e8bf32db2525b7d458b97a135ae3236530e3c_prof);

    }

    // line 2
    public function block_header($context, array $blocks = array())
    {
        $__internal_69d97bbf51e945caf56075299f4ff730e237ae48e227443a1a73ef71be28f6e3 = $this->env->getExtension("native_profiler");
        $__internal_69d97bbf51e945caf56075299f4ff730e237ae48e227443a1a73ef71be28f6e3->enter($__internal_69d97bbf51e945caf56075299f4ff730e237ae48e227443a1a73ef71be28f6e3_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "header"));

        // line 3
        echo "    <div class=\"header header-1\">
        <!-- img src=\"bundles/digitalartlab/images/secure.png\" class=\"img-header\" -->
        <img src=\"";
        // line 5
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("bundles/digitalartlab/images/secure.png"), "html", null, true);
        echo "\" alt=\"secure\" class=\"img-header\" />
    </div>
";
        
        $__internal_69d97bbf51e945caf56075299f4ff730e237ae48e227443a1a73ef71be28f6e3->leave($__internal_69d97bbf51e945caf56075299f4ff730e237ae48e227443a1a73ef71be28f6e3_prof);

    }

    // line 8
    public function block_body($context, array $blocks = array())
    {
        $__internal_d30f350bad751466defbb18663968f2624878878bcadf066ec77c3668f6c2828 = $this->env->getExtension("native_profiler");
        $__internal_d30f350bad751466defbb18663968f2624878878bcadf066ec77c3668f6c2828->enter($__internal_d30f350bad751466defbb18663968f2624878878bcadf066ec77c3668f6c2828_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 9
        echo "    ";
        $this->displayBlock('fos_user_content', $context, $blocks);
        
        $__internal_d30f350bad751466defbb18663968f2624878878bcadf066ec77c3668f6c2828->leave($__internal_d30f350bad751466defbb18663968f2624878878bcadf066ec77c3668f6c2828_prof);

    }

    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_6ef67e9f37914a2a6b5a42585c0546ede43c9add5ef9bd165a4c834839b20a28 = $this->env->getExtension("native_profiler");
        $__internal_6ef67e9f37914a2a6b5a42585c0546ede43c9add5ef9bd165a4c834839b20a28->enter($__internal_6ef67e9f37914a2a6b5a42585c0546ede43c9add5ef9bd165a4c834839b20a28_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 10
        echo "    ";
        
        $__internal_6ef67e9f37914a2a6b5a42585c0546ede43c9add5ef9bd165a4c834839b20a28->leave($__internal_6ef67e9f37914a2a6b5a42585c0546ede43c9add5ef9bd165a4c834839b20a28_prof);

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
