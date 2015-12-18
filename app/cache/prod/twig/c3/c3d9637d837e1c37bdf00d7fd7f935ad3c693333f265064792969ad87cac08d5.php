<?php

/* DigitalArtLabBundle:admin:stats.html.twig */
class __TwigTemplate_71ef5fd3fcd708bc6aa1f1dc236b34b91e535d2cfef643c2f55a3cd9be813fbd extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("::base.html.twig", "DigitalArtLabBundle:admin:stats.html.twig", 1);
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
        <h2 class=\"h2\">Statistieken</h2>
        ";
        // line 6
        $context["totaltransactionup"] = 0;
        // line 7
        echo "        ";
        $context["totaltransactiondown"] = 0;
        // line 8
        echo "        ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["transactions"]) ? $context["transactions"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["transaction"]) {
            // line 9
            echo "            ";
            if (($this->getAttribute($context["transaction"], "amount", array()) > 0)) {
                // line 10
                echo "                ";
                $context["totaltransactionup"] = ((isset($context["totaltransactionup"]) ? $context["totaltransactionup"] : null) + $this->getAttribute($context["transaction"], "amount", array()));
                // line 11
                echo "            ";
            } elseif (($this->getAttribute($context["transaction"], "amount", array()) < 0)) {
                // line 12
                echo "                ";
                $context["totaltransactiondown"] = ((isset($context["totaltransactiondown"]) ? $context["totaltransactiondown"] : null) + $this->getAttribute($context["transaction"], "amount", array()));
                // line 13
                echo "            ";
            }
            // line 14
            echo "        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['transaction'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 15
        echo "        <div class=\"stat\">
            <h2>Totaal opgewaardeerd</h2>
            ";
        // line 17
        echo twig_escape_filter($this->env, (isset($context["totaltransactionup"]) ? $context["totaltransactionup"] : null), "html", null, true);
        echo "
            <h2>Totaal afgeschreven</h2>
            ";
        // line 19
        echo twig_escape_filter($this->env, (isset($context["totaltransactiondown"]) ? $context["totaltransactiondown"] : null), "html", null, true);
        echo "
        </div>
        <div class=\"stat\">
            <h2>Uren totaal</h2>
            ";
        // line 23
        echo twig_escape_filter($this->env, (isset($context["totaaluren"]) ? $context["totaaluren"] : null), "html", null, true);
        echo "
            <h2>Gemiddelde sessieduur</h2>

            ";
        // line 26
        $context["sumratingsH"] = "0";
        // line 27
        echo "            ";
        $context["sumratingsi"] = "0";
        // line 28
        echo "            ";
        $context["sumratingss"] = "0";
        // line 29
        echo "            ";
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["checkins"]) ? $context["checkins"] : null));
        $context['loop'] = array(
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        );
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["checkin"]) {
            // line 30
            echo "                ";
            if ($this->getAttribute($context["checkin"], "sessionduration", array())) {
                // line 31
                echo "                    ";
                $context["sumratingsH"] = ((isset($context["sumratingsH"]) ? $context["sumratingsH"] : null) + (twig_date_format_filter($this->env, $this->getAttribute($context["checkin"], "sessionduration", array()), "H") / $this->getAttribute($context["loop"], "length", array())));
                // line 32
                echo "                    ";
                $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null) + (twig_date_format_filter($this->env, $this->getAttribute($context["checkin"], "sessionduration", array()), "i") / $this->getAttribute($context["loop"], "length", array())));
                // line 33
                echo "                    ";
                $context["sumratingss"] = ((isset($context["sumratingss"]) ? $context["sumratingss"] : null) + (twig_date_format_filter($this->env, $this->getAttribute($context["checkin"], "sessionduration", array()), "s") / $this->getAttribute($context["loop"], "length", array())));
                // line 34
                echo "                ";
            }
            // line 35
            echo "            ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['length'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['checkin'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 36
        echo "            ";
        $context["sumratingshl"] = (((isset($context["sumratingsH"]) ? $context["sumratingsH"] : null) - twig_round((isset($context["sumratingsH"]) ? $context["sumratingsH"] : null), 0, "floor")) * 60);
        // line 37
        echo "            ";
        $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null) + (isset($context["sumratingshl"]) ? $context["sumratingshl"] : null));
        // line 38
        echo "            ";
        if (((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null) > 60)) {
            // line 39
            echo "                ";
            $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null) / 60);
            // line 40
            echo "                ";
            $context["sumratingsH"] = ((isset($context["sumratingsH"]) ? $context["sumratingsH"] : null) + twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null), 0, "floor"));
            // line 41
            echo "                ";
            $context["sumratingsi"] = (((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null) - twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null), 0, "floor")) * 60);
            // line 42
            echo "            ";
        }
        // line 43
        echo "            ";
        $context["sumratingsil"] = (((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null) - twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null), 0, "floor")) * 60);
        // line 44
        echo "            ";
        $context["sumratingss"] = ((isset($context["sumratingss"]) ? $context["sumratingss"] : null) + (isset($context["sumratingsil"]) ? $context["sumratingsil"] : null));
        // line 45
        echo "            ";
        if (((isset($context["sumratingss"]) ? $context["sumratingss"] : null) > 60)) {
            // line 46
            echo "                ";
            $context["sumratingss"] = ((isset($context["sumratingss"]) ? $context["sumratingss"] : null) / 60);
            // line 47
            echo "                ";
            $context["sumratingsi"] = ((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null) + twig_round((isset($context["sumratingss"]) ? $context["sumratingss"] : null), 0, "floor"));
            // line 48
            echo "                ";
            $context["sumratingss"] = (((isset($context["sumratingss"]) ? $context["sumratingss"] : null) - twig_round((isset($context["sumratingss"]) ? $context["sumratingss"] : null), 0, "floor")) * 60);
            // line 49
            echo "            ";
        }
        // line 50
        echo "            <p>";
        echo twig_escape_filter($this->env, twig_round((isset($context["sumratingsH"]) ? $context["sumratingsH"] : null), 0, "floor"), "html", null, true);
        echo ":";
        echo twig_escape_filter($this->env, sprintf("%02d", twig_round((isset($context["sumratingsi"]) ? $context["sumratingsi"] : null), 0, "floor")), "html", null, true);
        echo ":";
        echo twig_escape_filter($this->env, sprintf("%02d", twig_round((isset($context["sumratingss"]) ? $context["sumratingss"] : null))), "html", null, true);
        echo "</p>


        </div>
        <div id=\"checkin_users\" ></div>
        <div id=\"created_users\" ></div>
        <div id=\"transactions_day\" ></div>
        <div class=\"btn-fill admin_button_container\">
            <a href=\"";
        // line 58
        echo $this->env->getExtension('routing')->getPath("admin");
        echo "\" class=\"button\">Terug naar dashboard</a>
        </div>
        <div class=\"clear\"></div>
    </div>
    <script type=\"text/javascript\">
        window.onload = function () {
            var chart = new CanvasJS.Chart(\"checkin_users\", {

                title:{
                    text: \"Aanmeldingen per dag\"
                },
                data: [//array of dataSeries
                    { //dataSeries object

                        /*** Change type \"column\" to \"bar\", \"area\", \"line\" or \"pie\"***/
                        type: \"line\",
                        yValueFormatString:\"# Sessie('s)\",
                        dataPoints: [
                            ";
        // line 76
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["groupsessions"]) ? $context["groupsessions"] : null));
        foreach ($context['_seq'] as $context["key"] => $context["sessions"]) {
            // line 77
            echo "                            { label: \"";
            echo twig_escape_filter($this->env, $context["key"], "html", null, true);
            echo "\", y: ";
            echo twig_escape_filter($this->env, $context["sessions"], "html", null, true);
            echo " },
                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['sessions'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 79
        echo "                        ]
                    }
                ]
            });

            chart.render();

            var chart2 = new CanvasJS.Chart(\"created_users\", {

                title:{
                    text: \"Nieuwe gebruikers per dag\"
                },
                data: [//array of dataSeries
                    { //dataSeries object

                        /*** Change type \"column\" to \"bar\", \"area\", \"line\" or \"pie\"***/
                        type: \"line\",
                        yValueFormatString:\"# Nieuwe gebruiker('s)\",
                        dataPoints: [
                            ";
        // line 98
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["createdusers"]) ? $context["createdusers"] : null));
        foreach ($context['_seq'] as $context["key"] => $context["users"]) {
            // line 99
            echo "                            { label: \"";
            echo twig_escape_filter($this->env, $context["key"], "html", null, true);
            echo "\", y: ";
            echo twig_escape_filter($this->env, $context["users"], "html", null, true);
            echo " },
                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['users'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 101
        echo "                        ]
                    }
                ]
            });

            chart2.render();

            var chart3 = new CanvasJS.Chart(\"transactions_day\", {
                title:{
                    text: \"Transacties per dag\"
                },

                data: [  //array of dataSeries
                    { //dataSeries - first quarter
                        /*** Change type \"column\" to \"bar\", \"area\", \"line\" or \"pie\"***/
                        type: \"line\",
                        yValueFormatString:\"# Opgewaardeerd\",
                        name: \"Opgewaardeerd\",
                        showInLegend: true,
                        dataPoints: [
                            ";
        // line 121
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["grouptransactionsup"]) ? $context["grouptransactionsup"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["transactions"]) {
            // line 122
            echo "                                ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($context["transactions"]);
            foreach ($context['_seq'] as $context["key"] => $context["values"]) {
                // line 123
                echo "                                    { label: \"";
                echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                echo "\", y: ";
                echo twig_escape_filter($this->env, $context["values"], "html", null, true);
                echo " },
                                ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['values'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 125
            echo "                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['transactions'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 126
        echo "                        ]
                    },

                    { //dataSeries - second quarter

                        type: \"line\",
                        yValueFormatString:\"# Afgeschreven\",
                        name: \"Afgeschreven\",
                        showInLegend: true,
                        dataPoints: [
                            ";
        // line 136
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["grouptransactionsdown"]) ? $context["grouptransactionsdown"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["transactions"]) {
            // line 137
            echo "                                ";
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($context["transactions"]);
            foreach ($context['_seq'] as $context["key"] => $context["values"]) {
                // line 138
                echo "                                    { label: \"";
                echo twig_escape_filter($this->env, $context["key"], "html", null, true);
                echo "\", y: ";
                echo twig_escape_filter($this->env, $context["values"], "html", null, true);
                echo " },
                                ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['values'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 140
            echo "                            ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['transactions'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 141
        echo "                        ]
                    }
                ],

            });

            chart3.render();

        }
    </script>
";
    }

    public function getTemplateName()
    {
        return "DigitalArtLabBundle:admin:stats.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  359 => 141,  353 => 140,  342 => 138,  337 => 137,  333 => 136,  321 => 126,  315 => 125,  304 => 123,  299 => 122,  295 => 121,  273 => 101,  262 => 99,  258 => 98,  237 => 79,  226 => 77,  222 => 76,  201 => 58,  185 => 50,  182 => 49,  179 => 48,  176 => 47,  173 => 46,  170 => 45,  167 => 44,  164 => 43,  161 => 42,  158 => 41,  155 => 40,  152 => 39,  149 => 38,  146 => 37,  143 => 36,  129 => 35,  126 => 34,  123 => 33,  120 => 32,  117 => 31,  114 => 30,  96 => 29,  93 => 28,  90 => 27,  88 => 26,  82 => 23,  75 => 19,  70 => 17,  66 => 15,  60 => 14,  57 => 13,  54 => 12,  51 => 11,  48 => 10,  45 => 9,  40 => 8,  37 => 7,  35 => 6,  31 => 4,  28 => 3,  11 => 1,);
    }
}
/* {% extends '::base.html.twig' %}*/
/* */
/* {% block body -%}*/
/*     <div class="content-container">*/
/*         <h2 class="h2">Statistieken</h2>*/
/*         {% set totaltransactionup = 0 %}*/
/*         {% set totaltransactiondown = 0 %}*/
/*         {% for transaction in transactions %}*/
/*             {% if transaction.amount > 0 %}*/
/*                 {% set totaltransactionup = totaltransactionup + transaction.amount %}*/
/*             {% elseif transaction.amount < 0 %}*/
/*                 {% set totaltransactiondown = totaltransactiondown + transaction.amount %}*/
/*             {% endif %}*/
/*         {% endfor %}*/
/*         <div class="stat">*/
/*             <h2>Totaal opgewaardeerd</h2>*/
/*             {{ totaltransactionup }}*/
/*             <h2>Totaal afgeschreven</h2>*/
/*             {{ totaltransactiondown }}*/
/*         </div>*/
/*         <div class="stat">*/
/*             <h2>Uren totaal</h2>*/
/*             {{ totaaluren }}*/
/*             <h2>Gemiddelde sessieduur</h2>*/
/* */
/*             {% set sumratingsH = '0' %}*/
/*             {% set sumratingsi = '0' %}*/
/*             {% set sumratingss = '0' %}*/
/*             {% for checkin in checkins %}*/
/*                 {% if checkin.sessionduration %}*/
/*                     {% set sumratingsH = sumratingsH + checkin.sessionduration|date('H') / loop.length %}*/
/*                     {% set sumratingsi = sumratingsi + checkin.sessionduration|date('i') / loop.length %}*/
/*                     {% set sumratingss = sumratingss + checkin.sessionduration|date('s') / loop.length %}*/
/*                 {% endif %}*/
/*             {% endfor %}*/
/*             {% set sumratingshl = (sumratingsH - sumratingsH|round(0, 'floor')) *60 %}*/
/*             {% set sumratingsi = sumratingsi + sumratingshl %}*/
/*             {%  if sumratingsi > 60 %}*/
/*                 {% set sumratingsi = sumratingsi / 60 %}*/
/*                 {% set sumratingsH = sumratingsH + sumratingsi|round(0, 'floor') %}*/
/*                 {% set sumratingsi = (sumratingsi - sumratingsi|round(0, 'floor')) *60 %}*/
/*             {% endif %}*/
/*             {% set sumratingsil = (sumratingsi - sumratingsi|round(0, 'floor')) *60 %}*/
/*             {% set sumratingss = sumratingss + sumratingsil %}*/
/*             {%  if sumratingss > 60 %}*/
/*                 {% set sumratingss = sumratingss / 60 %}*/
/*                 {% set sumratingsi = sumratingsi + sumratingss|round(0, 'floor') %}*/
/*                 {% set sumratingss = (sumratingss - sumratingss|round(0, 'floor')) *60 %}*/
/*             {% endif %}*/
/*             <p>{{  sumratingsH|round(0, 'floor') }}:{{  "%02d"|format(sumratingsi|round(0, 'floor')) }}:{{  "%02d"|format(sumratingss|round)  }}</p>*/
/* */
/* */
/*         </div>*/
/*         <div id="checkin_users" ></div>*/
/*         <div id="created_users" ></div>*/
/*         <div id="transactions_day" ></div>*/
/*         <div class="btn-fill admin_button_container">*/
/*             <a href="{{ path('admin') }}" class="button">Terug naar dashboard</a>*/
/*         </div>*/
/*         <div class="clear"></div>*/
/*     </div>*/
/*     <script type="text/javascript">*/
/*         window.onload = function () {*/
/*             var chart = new CanvasJS.Chart("checkin_users", {*/
/* */
/*                 title:{*/
/*                     text: "Aanmeldingen per dag"*/
/*                 },*/
/*                 data: [//array of dataSeries*/
/*                     { //dataSeries object*/
/* */
/*                         /*** Change type "column" to "bar", "area", "line" or "pie"***//* */
/*                         type: "line",*/
/*                         yValueFormatString:"# Sessie('s)",*/
/*                         dataPoints: [*/
/*                             {% for key,sessions in groupsessions %}*/
/*                             { label: "{{ key }}", y: {{ sessions }} },*/
/*                             {% endfor %}*/
/*                         ]*/
/*                     }*/
/*                 ]*/
/*             });*/
/* */
/*             chart.render();*/
/* */
/*             var chart2 = new CanvasJS.Chart("created_users", {*/
/* */
/*                 title:{*/
/*                     text: "Nieuwe gebruikers per dag"*/
/*                 },*/
/*                 data: [//array of dataSeries*/
/*                     { //dataSeries object*/
/* */
/*                         /*** Change type "column" to "bar", "area", "line" or "pie"***//* */
/*                         type: "line",*/
/*                         yValueFormatString:"# Nieuwe gebruiker('s)",*/
/*                         dataPoints: [*/
/*                             {% for key,users in createdusers %}*/
/*                             { label: "{{ key }}", y: {{ users }} },*/
/*                             {% endfor %}*/
/*                         ]*/
/*                     }*/
/*                 ]*/
/*             });*/
/* */
/*             chart2.render();*/
/* */
/*             var chart3 = new CanvasJS.Chart("transactions_day", {*/
/*                 title:{*/
/*                     text: "Transacties per dag"*/
/*                 },*/
/* */
/*                 data: [  //array of dataSeries*/
/*                     { //dataSeries - first quarter*/
/*                         /*** Change type "column" to "bar", "area", "line" or "pie"***//* */
/*                         type: "line",*/
/*                         yValueFormatString:"# Opgewaardeerd",*/
/*                         name: "Opgewaardeerd",*/
/*                         showInLegend: true,*/
/*                         dataPoints: [*/
/*                             {% for transactions in grouptransactionsup %}*/
/*                                 {% for key,values in transactions %}*/
/*                                     { label: "{{ key }}", y: {{ values }} },*/
/*                                 {% endfor %}*/
/*                             {% endfor %}*/
/*                         ]*/
/*                     },*/
/* */
/*                     { //dataSeries - second quarter*/
/* */
/*                         type: "line",*/
/*                         yValueFormatString:"# Afgeschreven",*/
/*                         name: "Afgeschreven",*/
/*                         showInLegend: true,*/
/*                         dataPoints: [*/
/*                             {% for transactions in grouptransactionsdown %}*/
/*                                 {% for key,values in transactions %}*/
/*                                     { label: "{{ key }}", y: {{ values }} },*/
/*                                 {% endfor %}*/
/*                             {% endfor %}*/
/*                         ]*/
/*                     }*/
/*                 ],*/
/* */
/*             });*/
/* */
/*             chart3.render();*/
/* */
/*         }*/
/*     </script>*/
/* {% endblock %}*/
