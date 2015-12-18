<?php

/* FOSUserBundle:transaction:index.html.twig */
class __TwigTemplate_891611ce649783a722a9174da4aba20b053995755648a65be7147c2e6eb6ab35 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("::base.html.twig", "FOSUserBundle:transaction:index.html.twig", 1);
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
        // line 4
        echo "<div class=\"content-container\">
    ";
        // line 5
        if ($this->getAttribute($this->getAttribute((isset($context["app"]) ? $context["app"] : null), "request", array(), "any", false, true), "get", array(0 => "status"), "method", true, true)) {
            // line 6
            echo "        ";
            $context["status"] = $this->getAttribute($this->getAttribute((isset($context["app"]) ? $context["app"] : null), "request", array()), "get", array(0 => "status"), "method");
            // line 7
            echo "        ";
            $context["id"] = $this->getAttribute($this->getAttribute((isset($context["app"]) ? $context["app"] : null), "request", array()), "get", array(0 => "id"), "method");
            // line 8
            echo "        ";
            if (((isset($context["status"]) ? $context["status"] : null) == "Succes")) {
                // line 9
                echo "            <p class=\"succesmessage\">Transactie #";
                echo twig_escape_filter($this->env, (isset($context["id"]) ? $context["id"] : null), "html", null, true);
                echo " succesvol!</p>
        ";
            } elseif ((            // line 10
(isset($context["status"]) ? $context["status"] : null) == "Fail")) {
                // line 11
                echo "            <p class=\"failmessage\">Transactie is mislukt, gebruiker heeft te weinig saldo.</p>
        ";
            }
            // line 13
            echo "    ";
        }
        // line 14
        echo "    <h2 class=\"h2\">Transactie geschiedenis</h2>
    <ul>
        <div class=\"btn-fill admin_button_container\">
            <a href=\"";
        // line 17
        echo $this->env->getExtension('routing')->getPath("admin");
        echo "\" class=\"button\">Terug naar overzicht</a>
            <a href=\"";
        // line 18
        echo $this->env->getExtension('routing')->getPath("admin_transaction_new");
        echo "\" class=\"button\">Nieuwe transactie</a>
        </div>
    </ul>
    <table class=\"usermanager transaction\">
        <thead>
            <tr class=\"th\">
                <th>Id</th>
                <th>Gebruikersnaam</th>
                <th>Door</th>
                <th>Tijd</th>
                <th>Oud saldo</th>
                <th>Nieuw saldo</th>
                <th>Verandering</th>
            </tr>
        </thead>
        <tbody>
        ";
        // line 34
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["entities"]) ? $context["entities"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["entity"]) {
            // line 35
            echo "            <tr>
                <td>";
            // line 36
            echo twig_escape_filter($this->env, $this->getAttribute($context["entity"], "id", array()), "html", null, true);
            echo "</td>
                <td><a href=\"";
            // line 37
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("userprofile", array("username" => $this->getAttribute($this->getAttribute($context["entity"], "user", array()), "username", array()))), "html", null, true);
            echo "\" target=\"_blank\">";
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($context["entity"], "user", array()), "username", array()), "html", null, true);
            echo "</a></td>
                <td>";
            // line 38
            echo twig_escape_filter($this->env, $this->getAttribute($context["entity"], "adminName", array()), "html", null, true);
            echo "</td>
                <td>";
            // line 39
            if ($this->getAttribute($context["entity"], "time", array())) {
                echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($context["entity"], "time", array()), "Y-m-d H:i:s"), "html", null, true);
            }
            echo "</td>
                <td>";
            // line 40
            echo twig_escape_filter($this->env, $this->getAttribute($context["entity"], "oldbalance", array()), "html", null, true);
            echo "</td>
                <td>";
            // line 41
            echo twig_escape_filter($this->env, $this->getAttribute($context["entity"], "newbalance", array()), "html", null, true);
            echo "</td>
                <td>";
            // line 42
            echo twig_escape_filter($this->env, $this->getAttribute($context["entity"], "amount", array()), "html", null, true);
            echo "</td>
            </tr>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['entity'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 45
        echo "        </tbody>
    </table>
</div>
    ";
    }

    public function getTemplateName()
    {
        return "FOSUserBundle:transaction:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  131 => 45,  122 => 42,  118 => 41,  114 => 40,  108 => 39,  104 => 38,  98 => 37,  94 => 36,  91 => 35,  87 => 34,  68 => 18,  64 => 17,  59 => 14,  56 => 13,  52 => 11,  50 => 10,  45 => 9,  42 => 8,  39 => 7,  36 => 6,  34 => 5,  31 => 4,  28 => 3,  11 => 1,);
    }
}
/* {% extends '::base.html.twig' %}*/
/* */
/* {% block body -%}*/
/* <div class="content-container">*/
/*     {% if app.request.get('status') is defined %}*/
/*         {% set status = app.request.get('status') %}*/
/*         {% set id = app.request.get('id') %}*/
/*         {% if status == 'Succes' %}*/
/*             <p class="succesmessage">Transactie #{{ id }} succesvol!</p>*/
/*         {% elseif status == 'Fail' %}*/
/*             <p class="failmessage">Transactie is mislukt, gebruiker heeft te weinig saldo.</p>*/
/*         {% endif %}*/
/*     {% endif %}*/
/*     <h2 class="h2">Transactie geschiedenis</h2>*/
/*     <ul>*/
/*         <div class="btn-fill admin_button_container">*/
/*             <a href="{{ path('admin') }}" class="button">Terug naar overzicht</a>*/
/*             <a href="{{ path('admin_transaction_new') }}" class="button">Nieuwe transactie</a>*/
/*         </div>*/
/*     </ul>*/
/*     <table class="usermanager transaction">*/
/*         <thead>*/
/*             <tr class="th">*/
/*                 <th>Id</th>*/
/*                 <th>Gebruikersnaam</th>*/
/*                 <th>Door</th>*/
/*                 <th>Tijd</th>*/
/*                 <th>Oud saldo</th>*/
/*                 <th>Nieuw saldo</th>*/
/*                 <th>Verandering</th>*/
/*             </tr>*/
/*         </thead>*/
/*         <tbody>*/
/*         {% for entity in entities %}*/
/*             <tr>*/
/*                 <td>{{ entity.id }}</td>*/
/*                 <td><a href="{{ path('userprofile', {'username': entity.user.username}) }}" target="_blank">{{ entity.user.username }}</a></td>*/
/*                 <td>{{ entity.adminName }}</td>*/
/*                 <td>{% if entity.time %}{{ entity.time|date('Y-m-d H:i:s') }}{% endif %}</td>*/
/*                 <td>{{ entity.oldbalance }}</td>*/
/*                 <td>{{ entity.newbalance }}</td>*/
/*                 <td>{{ entity.amount }}</td>*/
/*             </tr>*/
/*         {% endfor %}*/
/*         </tbody>*/
/*     </table>*/
/* </div>*/
/*     {% endblock %}*/
/* */
