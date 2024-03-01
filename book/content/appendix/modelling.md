# Modelling

Economic growth and development are dynamic processes and thus necessitate dynamic models. As we progress toward more complex models as Integrated Assessment Models, the dynamics will become nonlinear and analytical solution will not be possible.

In this book we will focus on Non-Linear Continuous Model that can be represented by ordinary differential equations "ODE", and solved numerically. As such, when possible we will use Gekko.

## Modelling Paradigms

Four different kinds of modelling will be discussed this week. Since these techniques are based on different assumptions, some people actually prefer to call them paradigms rather than techniques

## The Mathematical Modeling Framework

There are five basic elements to a sequential decision problem.

### State variables

The state St of the system at time t is a function of history which, com- bined with a policy and exogenous information, contains all the information that is necessary and sufficient to model our system from time t onward. This means it has to capture the information needed to compute costs/contributions, constraints on deci- sions, and the evolution of this information over time in the transition function (these are the equations that describe how the state variables evolve), all defined below. In fact, it is often best to write out the objective function (with costs/contributions), the constraints for the decisions, and the transition function, and then return to define the state variables.
We distinguish between the initial state $S_0$ and the dynamic state $S_t$ for $t > 0$. The initial state contains all deterministic parameters, initial values of dynamic parameters, and, in some settings, initial probabilistic beliefs about unknown parameters. The dynamic state St contains all information that is evolving over time. Note that the initial state S0 may include some deterministic parameters that do not change over time, which means these would be excluded from the dynamic state variable.
There are three types of information in St:
The physical state $R_t$
which in most (but not all) applications is the state variable that is being controlled. Rt may be a scalar, or a vector with element Rti where i could be a type of resource (e.g. a blood type) or the amount of inventory at location i.

#### Other information $I_t$

which is any information that is known deterministically not included in Rt. The information state often evolves exogenously, but may be controlled or at least influenced by decisions (e.g. selling a large number of shares may depress prices).

#### The belief state $B_t$

which contains information about aprobability distribution describing one or more unknown parameters. Thus, Bt could capture the mean and variance of a normal distribution. Alternatively, it could be a vector of probabilities that evolve over time.

We note that the distinction of “physical state” Rt versus “other information” It is somewhat imprecise, but there are many problems that involve the management of physical (and financial) resources where the state of the physical resources (in- ventories, location of a vehicle, location and speed of a robot) is a natural “state variable” (in fact, a common error is to assume that the state of physical resources is the only state variables). By contrast, the “other information” It is literally any other information that does not seem to belong in Rt. For example, Rt might be the amount of money in a cash account, while It might be the current state of the stock and bond markets.

The state St is sometimes referred to as the pre-decision state because it is the state just before we make a decision. We sometimes find it useful to define a post-decision state Stx which is the state immediately after we make a decision, but before any new information has arrived, which means that Stx is a deterministic function of St and xt. Forexample,inabasicinventoryproblemwhereRt+1 =max{0,Rt+xt−Dˆt+1}, the post-decision state would be Stx = Rtx = Rt + xt, which is the state after we have implemented our decision but before any new information (which would be the demands Dˆt+1) arrive.

Post-decision states are often simpler, because there may be information in St that is only needed to make the decision xt (we will see this in chapter 5). However, there are other situations where we place an order xtt′ at time t to be implemented at time t′ > t. In the case of these lagged decisions, we would have to keep these decisions in the state variable at time t + 1, which means the post-decision state is even higher-dimensional than the pre-decision state.

### Decision variables

Decisions are typically represented as at for discrete actions, ut for continuous (typically vector-valued) controls, and xt for general continuous or discrete vectors. We use xt as our default, but there are situations where at is useful when actions are discrete.

Decisions may be binary (e.g. for modeling when to sell an asset, or for A/B testing of different web designs), discrete (e.g. an element of a finite set), continuous (scalar or vector), integer vectors, and categorical (e.g. the attributes of a patient). We note that entire fields of research are sometimes distinguished by the nature of the decision variable.

We assume that decisions are made with a policy, which we might denote Xπ(St) (if we use xt as our decision), Aπ(St) (if we use at), or Uπ(St) (if we use ut). We assume that a decision xt = Xπ(St) is feasible at time t. We let “π” carry the information about the type of function f ∈ F (for example, a linear model with specific explanatory variables, or a particular nonlinear model), and any tunable parameters θ ∈ Θf .

### Exogenous information

We let Wt be any new information that first becomes known at time t (that is, between t − 1 and t). When modeling specific variables, we use “hats” to indicate exogenous information. Thus, Dˆt could be the demand that arises betweent−1andt,orwecouldletpˆt bethechangeinthepricebetweent−1and t.
The exogenous information process may be stationary or nonstationary, purely ex- ogenous or state (and possibly action) dependent. We let ω represent a sample path W1 , . . . , WT , where ω ∈ Ω represents one sample path of the exogenous informa- tion. Often, we will create a set Ω with a set of discrete samples that we might represent using (ω1, ω2, . . . , ωN ).

### Transition function

We denote the transition function by St+1 =SM(St,xt,Wt+1), (1.1) where SM(·) is also known by names such as system model, plant model, plant equation, state equation, and transfer function. Equation (1.1) is the classical form of a transition function which gives the equations from the pre-decision state St to pre-decision state St+1. We can also break down these equations into two steps: pre- decision to post-decision Stx, and then the post-decision Stx to the next pre-decision St+1. The transition function may be a known set of equations, or unknown, such as when we describe human behavior or the evolution of CO2 in the atmosphere. When the equations are unknown the problem is often described as “model free” or “data driven.”

Transition functions may be linear, continuous nonlinear or step functions. When the state St includes a belief state Bt, then the transition function has to include the updating equations (we illustrate this later).
Given a policy Xπ(St), an exogenous process Wt and a transition function, we can write our sequence of states, decisions, and information as
(S0,x0,S0x,W1,S1,x1,S1x,W2,...,xT−1,STx−1,WT,ST).

### Objective functions

While there are a number of dimensions to categorize objective functions, we are going to focus on two major classes:

#### Final reward

Here we wish to find a design x to maximize EW F (x, W ). While there are a small handful of problems where this can be solved directly (we illustrate one in chapter 3), we are going to focus on adaptive algorithms, or policies,thatwillproduceasolutionxπ,N whenweusepolicy(oralgorithm)π and have to find the best solution within our budget of N function evaluations. We let S0,W1,W2,...,WN be the initial state and information that is ob- served while we are learning xπ,N . Once we have found xπ,N , we then need to evaluate the quality of this solution by testing it under a new set of outcomes, which we represent using the random variable Wc.
We can then write our final (or terminal) reward objective function as

$$
maxE{F(x,W)|S }=E E 1 N 0E F(xπ,N,W). (1.2)
$$

Here, the transition function Sn+1 = SM(Sn,Xπ(Sn),Wn+1) describes the
c

#### Cumulative reward

We assume that we are maximizing contributions (or some utility) which we write as C(St, xt) to express its possible dependence on the state St (which might contain a price or other parameters that vary dynamically over time) and the action xt. There are instances where it can be convenient to write C(St, xt, Wt+1) if it is natural to write the contribution after we learn new information (such as sales of a product).
progression of our algorithm.
We now write our objective function as
where

## Modelling Paradigms

There are five basic elements to a sequential decision problem. We are going to quickly summarize these elements, but it is easiest to follow in the context of an example. We encourage readers to flip to the next chapter which illustrates this framework in the context of a simple asset selling problem.
State variables - The state St of the system at time t is a function of history which, com- bined with a policy and exogenous information, contains all the information that is necessary and sufficient to model our system from time t onward. This means it has to

## GEKKO

GEKKO is optimization software for mixed-integer and differential algebraic equations. It is coupled with large-scale solvers for linear, quadratic, nonlinear, and mixed integer programming (LP, QP, NLP, MILP, MINLP). Modes of operation include data reconciliation, real-time optimization, dynamic simulation, and nonlinear predictive control. The client or server is freely available with interfaces in MATLAB, Python, or from a web browser.

GEKKO is a high-level abstraction of mathematical optimization problems. Values in the models are defined by Constants, Parameters, and Variables. The values are related to each other by Intermediates or Equations. Objective functions are defined to maximize or minimize certain values. Objects are built-in collections of values (constants, parameters, and variables) and relationships (intermediates, equations, and objective functions). Objects can build upon other objects with object-oriented relationships.

The nice thing about Gekko is the ease to go from simulation to optimization. With only little change to our model we can transform un parameter to a decision variables and add an objective function to go from simulation to optimization.
