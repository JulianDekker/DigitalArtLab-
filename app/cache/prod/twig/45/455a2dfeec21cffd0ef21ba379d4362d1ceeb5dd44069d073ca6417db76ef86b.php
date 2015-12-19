<?php

/* DigitalArtLabBundle:Admin:index.html.twig */
class __TwigTemplate_6322e325c656797b9b357cc20fa1681a432ecf5a48aaba6121a84b0f8358a0d0 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("::base.html.twig", "DigitalArtLabBundle:Admin:index.html.twig", 1);
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
    <div class=\"infoblocks-container\">
       <h2 class=\"h2\">Administratie</h2>
        <div class=\"infoblock\">
            <a href=\"";
        // line 12
        echo $this->env->getExtension('routing')->getPath("admin_usermanager");
        echo "\">Gebruikersbeheer</a>
        </div>
        <div class=\"infoblock\">
            <a href=\"";
        // line 15
        echo $this->env->getExtension('routing')->getPath("admin_transaction");
        echo "\">Transactie geschiedenis</a>
        </div>
        <div class=\"infoblock\">
            <a href=\"";
        // line 18
        echo $this->env->getExtension('routing')->getPath("admin_checkin");
        echo "\">Sessie geschiedenis</a>
        </div>
        <div class=\"infoblock\">
            <a href=\"";
        // line 21
        echo $this->env->getExtension('routing')->getPath("admin_stats");
        echo "\">Statestieken</a>
        </div>
    </div>
    <div class=\"side-content\">
        <h2 class=\"h2\">Info</h2>
        <div class=\"peoplenline\">
            <h3>";
        // line 27
        echo twig_escape_filter($this->env, twig_length_filter($this->env, (isset($context["aanwezig"]) ? $context["aanwezig"] : null)), "html", null, true);
        echo " Gebruikers aanwezig</h3>
            <hr>
            <ul class=\"userlist\">
            ";
        // line 30
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["aanwezig"]) ? $context["aanwezig"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["user"]) {
            // line 31
            echo "                <li><a href=\"";
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("userprofile", array("username" => $this->getAttribute($context["user"], "username", array()))), "html", null, true);
            echo "\" target=\"_blank\">";
            echo twig_escape_filter($this->env, $this->getAttribute($context["user"], "firstname", array()), "html", null, true);
            echo " ";
            echo twig_escape_filter($this->env, $this->getAttribute($context["user"], "lastname", array()), "html", null, true);
            echo "</li>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['user'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 33
        echo "            </ul>
        </div>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "DigitalArtLabBundle:Admin:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  98 => 33,  85 => 31,  81 => 30,  75 => 27,  66 => 21,  60 => 18,  54 => 15,  48 => 12,  42 => 8,  39 => 7,  32 => 3,  29 => 2,  11 => 1,);
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
/*     <div class="infoblocks-container">*/
/*        <h2 class="h2">Administratie</h2>*/
/*         <div class="infoblock">*/
/*             <a href="{{ path('admin_usermanager') }}">Gebruikersbeheer</a>*/
/*         </div>*/
/*         <div class="infoblock">*/
/*             <a href="{{ path('admin_transaction') }}">Transactie geschiedenis</a>*/
/*         </div>*/
/*         <div class="infoblock">*/
/*             <a href="{{ path('admin_checkin') }}">Sessie geschiedenis</a>*/
/*         </div>*/
/*         <div class="infoblock">*/
/*             <a href="{{ path('admin_stats') }}">Statestieken</a>*/
/*         </div>*/
/*     </div>*/
/*     <div class="side-content">*/
/*         <h2 class="h2">Info</h2>*/
/*         <div class="peoplenline">*/
/*             <h3>{{ aanwezig|length }} Gebruikers aanwezig</h3>*/
/*             <hr>*/
/*             <ul class="userlist">*/
/*             {% for user in aanwezig %}*/
/*                 <li><a href="{{ path('userprofile', {'username': user.username}) }}" target="_blank">{{ user.firstname }} {{ user.lastname }}</li>*/
/*             {% endfor %}*/
/*             </ul>*/
/*         </div>*/
/*     </div>*/
/* </div>*/
/* {% endblock %}*/
