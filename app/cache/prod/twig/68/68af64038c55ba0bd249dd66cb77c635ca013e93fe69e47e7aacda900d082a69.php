<?php

/* DigitalArtLabBundle:default:index.html.twig */
class __TwigTemplate_bdc08ee0688628afbd55a20d9d1d4f04101ecf623cd486eddda27767039c26e0 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("::base.html.twig", "DigitalArtLabBundle:default:index.html.twig", 1);
        $this->blocks = array(
            'header' => array($this, 'block_header'),
            'body' => array($this, 'block_body'),
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
        echo "    <div class=\"header header-2\">

    </div>
";
    }

    // line 7
    public function block_body($context, array $blocks = array())
    {
        // line 8
        echo "<div class=\"content-container\">
    <h2 class=\"h2\">Welkom Bij het Digital Art Lab</h2>
    <div class=\"main-content\">
        <div class=\"introduction\">Het Digital Art Lab van CKC & partners (Zoetermeer) is een plek waar jongeren tussen 10 en 18 jaar de ruimte krijgen om in hun vrije tijd met nieuwe technologie&euml;n te experimenteren en hun eigen projecten te verwezenlijken. Jongeren leren bij het Digital Art Lab door zoveel mogelijk zelf te doen &eacute;n van elkaar te leren. Het lab sluit hiermee aan op een veranderende behoefte binnen de vrijetijdsbesteding van tieners. Er is geen vastomlijnd cursusaanbod, de jongeren bepalen z&eacute;lf waar ze zich mee bezig willen houden.</div>
        <img src=\"";
        // line 12
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("/bundles/DigitalArtLab/images/overhetlab-2.jpg"), "html", null, true);
        echo "\" class=\"img-responsive homepage-img\" />
    </div>
    <div class=\"side-content\">
        ";
        // line 15
        if ( !$this->env->getExtension('security')->isGranted("IS_AUTHENTICATED_FULLY")) {
            // line 16
            echo "            <div class=\"homepage_block\">
                <p>Word lid van het lab!</p>
                <a href=\"";
            // line 18
            echo $this->env->getExtension('routing')->getPath("fos_user_security_login");
            echo "\">Login</a> of <a href=\"";
            echo $this->env->getExtension('routing')->getPath("fos_user_registration_register");
            echo "\">Registreer</a>
            </div>
        ";
        } else {
            // line 21
            echo "            <div class=\"homepage_block\">
                <p>Welkom Bij het Digital Art Lab! <a href=\"";
            // line 22
            echo $this->env->getExtension('routing')->getPath("fos_user_profile_show");
            echo "\">";
            echo twig_escape_filter($this->env, $this->getAttribute((isset($context["app"]) ? $context["app"] : null), "user", array()), "html", null, true);
            echo "</a></p>
                <hr>
                <p><a href=\"";
            // line 24
            echo $this->env->getExtension('routing')->getPath("fos_user_security_logout");
            echo "\">Uitloggen</a></p>
            </div>
        ";
        }
        // line 27
        echo "    </div>
</div>

";
    }

    public function getTemplateName()
    {
        return "DigitalArtLabBundle:default:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  84 => 27,  78 => 24,  71 => 22,  68 => 21,  60 => 18,  56 => 16,  54 => 15,  48 => 12,  42 => 8,  39 => 7,  32 => 3,  29 => 2,  11 => 1,);
    }
}
/* {% extends '::base.html.twig' %}*/
/* {% block header %}*/
/*     <div class="header header-2">*/
/* */
/*     </div>*/
/* {% endblock %}*/
/* {% block body -%}*/
/* <div class="content-container">*/
/*     <h2 class="h2">Welkom Bij het Digital Art Lab</h2>*/
/*     <div class="main-content">*/
/*         <div class="introduction">Het Digital Art Lab van CKC & partners (Zoetermeer) is een plek waar jongeren tussen 10 en 18 jaar de ruimte krijgen om in hun vrije tijd met nieuwe technologie&euml;n te experimenteren en hun eigen projecten te verwezenlijken. Jongeren leren bij het Digital Art Lab door zoveel mogelijk zelf te doen &eacute;n van elkaar te leren. Het lab sluit hiermee aan op een veranderende behoefte binnen de vrijetijdsbesteding van tieners. Er is geen vastomlijnd cursusaanbod, de jongeren bepalen z&eacute;lf waar ze zich mee bezig willen houden.</div>*/
/*         <img src="{{ asset('/bundles/DigitalArtLab/images/overhetlab-2.jpg') }}" class="img-responsive homepage-img" />*/
/*     </div>*/
/*     <div class="side-content">*/
/*         {% if not is_granted('IS_AUTHENTICATED_FULLY') %}*/
/*             <div class="homepage_block">*/
/*                 <p>Word lid van het lab!</p>*/
/*                 <a href="{{ path('fos_user_security_login') }}">Login</a> of <a href="{{ path('fos_user_registration_register') }}">Registreer</a>*/
/*             </div>*/
/*         {% else %}*/
/*             <div class="homepage_block">*/
/*                 <p>Welkom Bij het Digital Art Lab! <a href="{{ path('fos_user_profile_show') }}">{{ app.user }}</a></p>*/
/*                 <hr>*/
/*                 <p><a href="{{ path('fos_user_security_logout') }}">Uitloggen</a></p>*/
/*             </div>*/
/*         {% endif %}*/
/*     </div>*/
/* </div>*/
/* */
/* {% endblock %}*/
/* */
