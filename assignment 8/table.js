/*
     91.461 Assignment 8: Using the jQuery Validation Plugin and jQueryUI Tabbed Widget
     Mihir Patel, UMass Lowell Computer Science, mihir_patel@student.uml.edu
     Created on November 24, 2014
     I have received helpe from Takyiu Lo.
     This webpage will get a range of multiplication table and creates it to new tabs. */
$(document).ready(function() {
    var tabs = $("#tabs").tabs();
    /* Validator */
    $.validator.addMethod('GreaterThanStartRow', function(value, element, param) {
        if (pTwo.value === "") {
            return true;
        }
        return parseInt(pTwo.value) >= parseInt(pOne.value);
    }, "The Last row must be greater than the First row.");
    $.validator.addMethod('GreaterThanStartColumn', function(value, element, param) {
        return parseInt(pFour.value) >= parseInt(pThree.value);
    }, "The Last column must be greater than the Start column.");
    $('#form').validate({
        rules: {
            pOne: {
                required: true,
                digits: true
            },
            pTwo: {
                required: true,
                digits: true,
                GreaterThanStartRow: true
            },
            pThree: {
                required: true,
                digits: true
            },
            pFour: {
                required: true,
                digits: true,
                GreaterThanStartColumn: true
            }
        },
        onkeyup: function(element) {
            if ($('form').valid()) {
                $('form').find(":submit").attr("disabled", false);
            } else {
                $('form').find(":submit").attr("disabled", true);
            }
        },
        /* "The validation plugin allows you to configure these class names"
         * http://stackoverflow.com/questions/6168926/jquery-validation-how-to-make-fields-red
         */
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });

    function crTable(nextTabNo) {
        /* getting the four values from the user */
        /* putting a "+" to treat the value as a number instead of string */
        var pOne = +document.getElementById("pOne").value;
        var pTwo = +document.getElementById("pTwo").value;
        var pThree = +document.getElementById("pThree").value;
        var pFour = +document.getElementById("pFour").value;
        /* get the reference for the preview */
        var preview = document.getElementById(nextTabNo);
        /* creates a <table> element and a <tbody> element */
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        /* creating all cells */
        for (var i = pOne, ii = pTwo + 1; i <= ii; ++i) {
            /* creates a table row */
            var row = document.createElement("tr");
            for (var j = pThree, jj = pFour + 1; j <= jj; ++j) {
                /* creates a cell */
                var cell = document.createElement("td");
                var cellText;
                /* give some style to the cell/table */
                var cellStyle = "padding: 10px; color: #FFF;";
                if (i == pOne && j == pThree) {
                    cellText = document.createTextNode("");
                    cell.setAttribute("style", cellStyle + "background-color: #FFF");
                } else if (i == pOne) {
                    cellText = document.createTextNode(j - 1);
                    cell.setAttribute("style", cellStyle + "background-color: #000");
                } else if (j == pThree) {
                    cellText = document.createTextNode(i - 1);
                    cell.setAttribute("style", cellStyle + "background-color: #000");
                } else {
                    cellText = document.createTextNode((i - 1) * (j - 1));
                    cell.setAttribute("style", cellStyle + "background-color: #FF0000");
                }
                /* add the text to cell */
                cell.appendChild(cellText);
                /* add the cell to row */
                row.appendChild(cell);
            }
            /* add the row to the end of the table body */
            tblBody.appendChild(row);
        }
        /* put the <tbody> in the <table> */
        tbl.appendChild(tblBody);
        /* appends <table> into preview */
        preview.appendChild(tbl);
    }
    var tabsdiv = $("#tabs");
    var tabslist = tabsdiv.find("ul");
    var nextTabNo = tabslist.find("li").length;
    /* When create button click, a new tab will generate */
    $('#make').click(function() {
        /* check for first time */
        if (!$('form').valid()) {
            $('form').find(":submit").attr("disabled", true);
            return;
        }
        /* create a new tab with close button next to it
         * http://stackoverflow.com/questions/14357614/add-close-button-to-jquery-ui-tabs
         */
        tabslist.append('<li id="li' + nextTabNo + '"><a href="#tab' + nextTabNo + '">' + 'Tab ' + (nextTabNo + 1) + '<\/a><input name="check" type="checkbox" id="checkbox' +
            nextTabNo + '"><span id="tabspan' + nextTabNo + '" class="ui-icon ui-icon-circle-close"></span><\/li>');
        // add content to the new tab */
        tabsdiv.append('<div id="tab' + nextTabNo + '"><\/div>');
        /* create content table to the new tab */
        crTable("tab" + nextTabNo);
        ++nextTabNo;
        $('#tabs').tabs("refresh");
    });
    /* When close span clicked, it will close the tab that are closest to which you clicked */
    tabs.delegate("span.ui-icon-circle-close", "click", function() {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });
    $('#delete').click(function() {
        /* push id in the selected */
        var selected = [];
        $('input:checkbox:checked').each(function() {
            selected.push($(this).attr('id'));
        });
        /* remove those unwanted tabs */
        for (var m = 0; m < selected.length; m++) {
            var checkboxID = "" + selected[m];
            var num = checkboxID.substring(8, checkboxID.length);
            $('#tab' + num).remove();
            $('#li' + num).remove();
        }
        $('#tabs').tabs("refresh");
    });
});