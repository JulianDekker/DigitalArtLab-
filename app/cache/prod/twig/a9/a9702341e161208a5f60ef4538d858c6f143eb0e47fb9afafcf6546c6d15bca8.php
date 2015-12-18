<?php

/* DigitalArtLabBundle:checkin:history.html.twig */
class __TwigTemplate_589ac65b813bb16a245ae6425843de3ac999aa6bbacb740b9c9acdfbc9bd3796 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("::base.html.twig", "DigitalArtLabBundle:checkin:history.html.twig", 1);
        $this->blocks = array(
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

    // line 3
    public function block_body($context, array $blocks = array())
    {
        // line 5
        echo "<div class=\"content-container\">
        <h2 class=\"h2\">Sessie geschiedenis</h2>
        <div class=\"btn-fill admin_button_container\">
            <a href=\"";
        // line 8
        echo $this->env->getExtension('routing')->getPath("admin");
        echo "\" class=\"button\">Terug naar overzicht</a>
        </div>
        <table class=\"usermanager transaction\">
            <thead>
            <tr class=\"th\">
                <th>Id</th>
                <th>Gebruikersnaam</th>
                <th>Tijd in</th>
                <th>Tijd uit</th>
                <th>Sessie duur</th>
            </tr>
            </thead>
            <tbody>
            ";
        // line 21
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["checkin"]) ? $context["checkin"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["checkins"]) {
            // line 22
            echo "                <tr>
                    ";
            // line 23
            if (((null === $this->getAttribute($context["checkins"], "timeout", array())) || (isset($context["empty"]) ? $context["empty"] : null))) {
            } else {
                // line 24
                echo "                        <td>";
                echo twig_escape_filter($this->env, $this->getAttribute($context["checkins"], "id", array()), "html", null, true);
                echo "</td>
                        <td><a href=\"";
                // line 25
                echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("userprofile", array("username" => $this->getAttribute($context["checkins"], "username", array()))), "html", null, true);
                echo "\" target=\"_blank\">";
                echo twig_escape_filter($this->env, $this->getAttribute($context["checkins"], "username", array()), "html", null, true);
                echo "</a></td>
                        <td>";
                // line 26
                echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["checkins"], "timein", array()), "d-m-Y H:i:s"), "html", null, true);
                echo "</td>
                        <td>";
                // line 27
                echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["checkins"], "timeout", array()), "d-m-Y H:i:s"), "html", null, true);
                echo "</td>
                        <td>";
                // line 28
                echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["checkins"], "sessionduration", array()), "H:i:s"), "html", null, true);
                echo "</td>
                    ";
            }
            // line 30
            echo "                </tr>
            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['checkins'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 32
        echo "            </tbody>
        </table>
    </div>

";
    }

    public function getTemplateName()
    {
        return "DigitalArtLabBundle:checkin:history.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  93 => 32,  86 => 30,  81 => 28,  77 => 27,  73 => 26,  67 => 25,  62 => 24,  59 => 23,  56 => 22,  52 => 21,  36 => 8,  31 => 5,  28 => 3,  11 => 1,);
    }
}
/* {% extends '::base.html.twig' %}*/
/* */
/* {% block body -%}*/
/* */
/*     <div class="content-container">*/
/*         <h2 class="h2">Sessie geschiedenis</h2>*/
/*         <div class="btn-fill admin_button_container">*/
/*             <a href="{{ path('admin') }}" class="button">Terug naar overzicht</a>*/
/*         </div>*/
/*         <table class="usermanager transaction">*/
/*             <thead>*/
/*             <tr class="th">*/
/*                 <th>Id</th>*/
/*                 <th>Gebruikersnaam</th>*/
/*                 <th>Tijd in</th>*/
/*                 <th>Tijd uit</th>*/
/*                 <th>Sessie duur</th>*/
/*             </tr>*/
/*             </thead>*/
/*             <tbody>*/
/*             {% for checkins in checkin %}*/
/*                 <tr>*/
/*                     {% if checkins.timeout is null or empty %}{% else %}*/
/*                         <td>{{ checkins.id }}</td>*/
/*                         <td><a href="{{ path('userprofile', {'username': checkins.username}) }}" target="_blank">{{ checkins.username }}</a></td>*/
/*                         <td>{{ checkins.timein|date('d-m-Y H:i:s') }}</td>*/
/*                         <td>{{ checkins.timeout|date('d-m-Y H:i:s') }}</td>*/
/*                         <td>{{ checkins.sessionduration|date('H:i:s') }}</td>*/
/*                     {% endif %}*/
/*                 </tr>*/
/*             {% endfor %}*/
/*             </tbody>*/
/*         </table>*/
/*     </div>*/
/* */
/* {% endblock %}*/
