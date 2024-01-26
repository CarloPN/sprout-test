Feature: Sprout Test Challenge

  Scenario Outline: As a user, I can search for an Id and retrieve related values

    Given I am at the demo page
    When I search for an "<Id>"
    Then I should see all values related to that Id, including:
      | Id    | Person      | Food          | Country             | Date        | Chef              |
      | <Id>  | <Person>    | <Food>        | <Country>           | <Date>      | <Chef>            |

    Examples:
      | Id    | Person      | Food          | Country             | Date        | Chef              |
      | 1991  | Linda       | Apple         | Ironforge           | 7/25/2010   | Hercules Oat      |
      | 1992  |             |               |                     |             |                   |
      | 1993  | Nicole      | Hot Beverage  | Piccadilly          | 2/9/2010    | Pepper Tomato     |
      | 1994  |             |               |                     |             |                   |
      | 1995  | Samir       | French toast  | Stormwind           | 2/19/2016    | Josh Baskin       |
      | 1996  |             |               |                     |             |                   |
      | 1997  | Harry       | Hot Beverage  | Feralas             | 4/11/2019   | Omu Man           |
      | 1998  |             |               |                     |             |                   |
      | 1999  | Glenn       | Big Salad     | Feralas             | 11/11/2009  | Charles Duchemin  |
      | 2000  |             |               |                     |             |                   |
      | 2001  | Ruby        | Banana        | Redridge Mountains  | 7/13/2010   | Naked Chef        |
      | 2002  |             |               |                     |             |                   |
